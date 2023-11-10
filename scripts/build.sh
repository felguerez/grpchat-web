#!/bin/bash

SERVICE_NAME="grpchat-web"
ECR_REPO="413025517373.dkr.ecr.us-east-1.amazonaws.com/grpchat-web"
PROJECT_ROOT_DIR="$(dirname "$0")/.."  # This gets the parent directory of the script location

# Fetch the latest commit hash
GIT_COMMIT_HASH=$(git -C "$PROJECT_ROOT_DIR" rev-parse --short HEAD)
if [ -z "$GIT_COMMIT_HASH" ]; then
    echo "Error: Failed to get the latest git commit hash."
    exit 1
fi

echo "Project directory is $PROJECT_ROOT_DIR"
echo "Latest commit hash is $GIT_COMMIT_HASH"

# login
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REPO

# Enable Docker BuildKit to parallelize build steps and optimize caching
export DOCKER_BUILDKIT=1

# Build Docker image with the git commit hash as tag
docker build -t $SERVICE_NAME:$GIT_COMMIT_HASH "$PROJECT_ROOT_DIR"

# Tag Docker image for Amazon ECR with the git commit hash
docker tag $SERVICE_NAME:$GIT_COMMIT_HASH $ECR_REPO:$GIT_COMMIT_HASH

# Push Docker image to Amazon ECR
docker push "$ECR_REPO:$GIT_COMMIT_HASH"
