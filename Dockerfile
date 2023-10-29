# Use an official Node runtime as the base image
FROM --platform=linux/amd64 node:18-alpine

# Install Python and other dependencies
RUN apk add --no-cache python3 make g++

# Set environment variables
ENV npm_config_target_arch=arm64

# Set working directory
WORKDIR /app

# Install dependencies first (this layer will be cached)
COPY package.json yarn.lock ./
RUN yarn install

# Copy over tsconfig.json and any other build-related files
COPY tsconfig.json ./

# Copy the current directory contents into the container
COPY . .

# Build the application
RUN yarn build

# Expose port
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
