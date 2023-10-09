import { NextRequest, NextResponse } from "next/server";
import { credentials, Metadata } from "@grpc/grpc-js";
import { chat } from "@/proto/chat";
import { get } from "@/app/lib/request/get";

export async function GET(request: NextRequest) {
  const API_URL = "http://localhost:8080/api/messages";
  const response = await fetch(API_URL);
  if (response.ok) {
    return response.json();
  }
  console.log("Throwing error; here's the request:\n", request);
  throw new Error("Error in request");
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
  const { user_id, content, conversation_id } = body;

  const req = new chat.SendMessageRequest({
    user_id,
    content,
    conversation_id,
  });

  console.log("req.toObject():", req.toObject());
  const stream = client.ChatStream();
  return new Promise((resolve) => {
    client.SendMessage(req, new Metadata({}), (error: any, response) => {
      if (error) {
        console.error("error says ", error);
        resolve(NextResponse.json({ status: "bad" }, { status: 500 }));
      } else {
        console.log("gRPC call completed");
        resolve(NextResponse.json(response?.toObject()));
      }
    });
    stream.write(req);
  });
}
