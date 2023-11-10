#!/bin/bash

CLUSTER_NAME="grpchat-grpc-cluster"
SERVICE_NAME="grpchat-web"
PROJECT_ROOT_DIR="$(dirname "$0")/.."
cd "$PROJECT_ROOT_DIR" || { echo "Could not find project root directory"; exit 1; }

TASK_DEF_PATH="$PROJECT_ROOT_DIR/deploy/ecs-task-definition-nextjs.json"

# Register the new task definition to create a new revision
NEW_TASK_DEF_ARN=$(aws ecs register-task-definition \
  --cli-input-json file://"$TASK_DEF_PATH" \
  --query 'taskDefinition.taskDefinitionArn' \
  --output text)

# Check if the task definition was registered successfully
if [ -z "$NEW_TASK_DEF_ARN" ]; then
    echo "Failed to register new task definition for Next.js."
    exit 1
fi

echo "Registered new task definition: $NEW_TASK_DEF_ARN"

# Update the ECS service to use the new task definition revision
aws ecs update-service \
  --cluster "$CLUSTER_NAME" \
  --service "$SERVICE_NAME" \
  --task-definition "$NEW_TASK_DEF_ARN" \
  --force-new-deployment

if [ $? -eq 0 ]; then
    echo "Deployment for Next.js service initiated with task definition $NEW_TASK_DEF_ARN."
else
    echo "Failed to initiate deployment for Next.js service."
    exit 1
fi
