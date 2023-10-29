#!/bin/bash

# login
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 413025517373.dkr.ecr.us-east-1.amazonaws.com

# Build Docker image
docker build -t grpchat-web .

# Tag Docker image for Amazon ECR
docker tag grpchat-web:latest 413025517373.dkr.ecr.us-east-1.amazonaws.com/grpchat-web:latest

# Push Docker image to Amazon ECR
docker push 413025517373.dkr.ecr.us-east-1.amazonaws.com/grpchat-web:latest

# Optionally, update ECS service if you decide to go that route in the future
# aws ecs update-service --cluster YOUR_CLUSTER_NAME --service YOUR_SERVICE_NAME --force-new-deployment
