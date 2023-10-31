import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/proto/chat";
import { credentials, ServiceError } from "@grpc/grpc-js";
import {cookies} from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { conversationId: string } },
) {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('session_id');
  const client = new chat.ChatServiceClient(
    process.env.GRPC_API_URL!,
    credentials.createInsecure(),
    { interceptors: [] },
  );
  const getConversationRequest = new chat.GetConversationRequest({
    conversation_id: params.conversationId,
  });

  return new Promise<NextResponse>((resolve, reject) => {
    client.GetConversation(
      getConversationRequest,
      (error: ServiceError | null, response) => {
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
