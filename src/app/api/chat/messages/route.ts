import { NextRequest, NextResponse } from "next/server";
import { credentials, Metadata } from "@grpc/grpc-js";
import { chat } from "@/proto/chat";
import { get } from "@/app/lib/request/get";

export async function GET(request: NextRequest) {
  const API_URL = `${process.env.API_URL}/api/messages`;
  const response = await fetch(API_URL);
  if (response.ok) {
    return response.json();
  }
  console.log("Throwing error; here's the request:\n", request);
  throw new Error("Error in request");
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log("I'm gonna send a message to the URL ", process.env.GRPC_API_URL);
  const client = new chat.ChatServiceClient(
    process.env.GRPC_API_URL!,
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

  console.log("sending request object: ", req.toObject());
  const stream = client.ChatStream();
  return new Promise((resolve) => {
    client.SendMessage(req, new Metadata({}), (error: any, response) => {
      if (error) {
        console.error("error calling client.SendMessage: ", error);
        resolve(NextResponse.json({ status: "bad" }, { status: 500 }));
      } else if (response) {
        console.log("gRPC call completed");
        resolve(NextResponse.json(response.toObject()));
      } else {
        console.error(
          `
        No response or error in client.SendMessage callback;
        Request object sent: `,
          req.toObject(),
        );
      }
    });
    console.log("Writing to chat stream");
    return stream.write(req);
  });
}
