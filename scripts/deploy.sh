#!/bin/bash

CLUSTER_NAME="grpchat-grpc-cluster"
SERVICE_NAME="grpchat-web"
ECR_REPO="413025517373.dkr.ecr.us-east-1.amazonaws.com/grpchat-web"
PROJECT_ROOT_DIR="$(dirname "$0")/.."  # This gets the parent directory of the script location

echo "Project directory is $PROJECT_ROOT_DIR"

# login
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REPO

# Change to project root directory (assuming script is in ./scripts/)
cd "$SCRIPT_DIR/.."

# Build Docker image
docker build -t $SERVICE_NAME "$PROJECT_ROOT_DIR"

# Tag Docker image for Amazon ECR
docker tag $SERVICE_NAME:latest $ECR_REPO:latest

# Push Docker image to Amazon ECR
docker push $ECR_REPO:latest

# Update ECS service to force a new deployment (pulls the latest image from ECR)
aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_NAME --force-new-deployment
