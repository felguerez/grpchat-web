This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This app is deployed to AWS on an ECS cluster. To deploy changes you will build and tag the Docker image locally, then push to ECR.

Use the `latest` tag when building and deploying; otherwise, you'll need to update the ECS service definition found in [deploy/](deploy/ecs-task-definition-nextjs.json).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Generating gRPC stubs

Run the [generate-grpc.sh script](./generate-grpc.sh) to create gRPC stubs for use in API routes and route handers.

If you encounter an error related to `protoc` not being found, you may need to set up a symlink. Run the following command:

```bash
ln -s /opt/homebrew/opt/protobuf@3/bin/protoc /path/to/your/project/node_modules/grpc-tools/bin/protoc
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# Deploy this project

Follow these steps to build the app and prepare a Docker image for deployment:

#### 1. Build the Docker image locally:
```bash
docker build -t grpchat-web .
```

#### 2. Test the built image:

```bash
docker run -p 3000:3000 grpchat-web
```
Visit `http://localhost:3000` in your browser. If all is well continue onto the next step.

#### 3. Tag the Docker Image for ECR:
```bash
docker tag grpchat-web:latest 413025517373.dkr.ecr.us-east-1.amazonaws.com/grpchat-web:latest
```

#### 4. Push the Docker Image to ECR:
```bash
docker push 413025517373.dkr.ecr.us-east-1.amazonaws.com/grpchat-web:latest
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!