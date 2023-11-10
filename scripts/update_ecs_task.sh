#!/bin/bash

PROJECT_ROOT_DIR="$(dirname "$0")/.."
cd "$PROJECT_ROOT_DIR" || { echo "Could not find project root directory"; exit 1; }

# Fetch the latest commit hash
GIT_COMMIT_HASH=$(git rev-parse --short HEAD)
if [ -z "$GIT_COMMIT_HASH" ]; then
    echo "Error: Failed to get the latest git commit hash."
    exit 1
fi

# Set variables
TASK_DEF_PATH="$PROJECT_ROOT_DIR/deploy/ecs-task-definition-nextjs.json"
ECR_REPO="413025517373.dkr.ecr.us-east-1.amazonaws.com/grpchat-web"
IMAGE_TAG="${ECR_REPO}:${GIT_COMMIT_HASH}"

# Update the image in the ECS task definition file
jq --arg image_tag "$IMAGE_TAG" \
    '(.containerDefinitions[] | select(.name == "grpchat-web-container") | .image) |= $image_tag' \
    "$TASK_DEF_PATH" > temp.nextjs.json

# Check if jq succeeded and then overwrite the original task definition file
if [ $? -eq 0 ]; then
    mv temp.nextjs.json "$TASK_DEF_PATH"
    echo "Updated Next.js service image tag to $IMAGE_TAG in $TASK_DEF_PATH"
else
    echo "Failed to update Next.js service image tag in $TASK_DEF_PATH"
    rm -f temp.nextjs.json
    exit 1
fi
