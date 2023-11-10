#!/bin/bash

# Define the project root directory
PROJECT_ROOT_DIR="$(dirname "$0")/.."

# Navigate to the project root directory
cd "$PROJECT_ROOT_DIR" || { echo "Could not find project root directory"; exit 1; }

# Step 1: Build and Push the Docker image for grpchat-web
./scripts/build.sh
if [ $? -ne 0 ]; then
    echo "Build and push for grpchat-web failed."
    exit 1
fi

# Step 2: Update the ECS Task Definition with the new image tag for grpchat-web
./scripts/update_ecs_task.sh
if [ $? -ne 0 ]; then
    echo "Update ECS task definition for grpchat-web failed."
    exit 1
fi

# Step 3: Deploy the new version to ECS for grpchat-web
./scripts/deploy.sh
if [ $? -ne 0 ]; then
    echo "Deployment for grpchat-web failed."
    exit 1
fi

echo "grpchat-web has been built, task definition updated, and deployment initiated."
