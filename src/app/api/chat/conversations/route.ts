import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/proto/chat";
import { credentials, ServiceError } from "@grpc/grpc-js";
import { get } from "@/app/lib/request/get";

export async function GET(request: NextRequest) {
  const client = new chat.ChatServiceClient(
    "localhost:50051",
    credentials.createInsecure(),
    { interceptors: [] },
  );
  const getConversationsRequest = new chat.GetConversationsRequest({
    user_id: "felguerez",
  });

  return new Promise<NextResponse>((resolve, reject) => {
    client.GetConversations(
      getConversationsRequest,
      (error: ServiceError | null, response) => {
        console.log("error in GetConversations gRPC:", error);
        if (error) {
          reject(
            NextResponse.json({ status: "error", message: error.message }),
          );
        } else {
          if (response) {
            resolve(NextResponse.json(response.toObject()));
          }
          resolve(NextResponse.json({ status: "hmm" }));
        }
      },
    );
  });
}

export async function POST(request: NextRequest) {
  const client = new chat.ChatServiceClient(
    "localhost:50051",
    credentials.createInsecure(),
    { interceptors: [] },
  );

  const body = await get(request);

  if (body instanceof NextResponse) {
    return body;
  }

  const { user_id = "felguerez", name } = body; // @TODO: add user_id

  if (!user_id || !name) {
    return NextResponse.json({
      status: "bad",
      message: "Missing required fields",
    });
  }

  // Create a new CreateConversationRequest
  const createConversationRequest = new chat.CreateConversationRequest({
    name,
    owner_id: user_id,
    members: [], // Add members if needed
  });

  return new Promise<NextResponse>((resolve, reject) => {
    client.CreateConversation(
      createConversationRequest,
      (error: ServiceError | null, response) => {
        if (error) {
          reject(
            NextResponse.json({ status: "error", message: error.message }),
          );
        } else {
          if (response) {
            resolve(
              NextResponse.json({
                status: "ok",
                conversationId: response.conversation_id,
              }),
            );
          }
          resolve(NextResponse.json({ status: "hmm" }));
        }
      },
    );
  });
}
