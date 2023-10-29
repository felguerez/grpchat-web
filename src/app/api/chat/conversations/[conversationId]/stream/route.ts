// import {WebSocket} from "ws";
import { credentials } from "@grpc/grpc-js";
import { chat } from "@/proto/chat";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  params: { conversationId: string },
) {
  const client = new chat.ChatServiceClient(
    "localhost:50051",
    credentials.createInsecure(),
  );

  // Create a new stream for the chat
  const stream = client.ChatStream();
  const data = streamGrpc(stream);

  // Listen for messages from the server
  stream.on("data", (message: any) => {
    // Check if the message belongs to the current conversation
    if (message.conversationId === params.conversationId) {
      console.log("New message:", message.content);
      // Handle the new message (e.g., update the UI)
    }
  });

  stream.on("end", () => {
    console.log("Stream ended");
  });

  stream.on("error", (err: any) => {
    console.error("Stream error:", err);
  });
  const res = new NextResponse(data, {
    status: 200,
    headers: new Headers({
      "content-disposition": `attachment`,
      "content-type": "application/iso",
      "content-length": "*",
    }),
  });
  return res;
}

function streamGrpc(stream: any) {
  return new ReadableStream({
    start(controller) {
      stream.on("data", (chunk: Buffer) => {
        console.log("chunk:", chunk);
        controller.enqueue(chunk);
      });
      stream.on("end", () => controller.close());
      stream.on("error", (error: NodeJS.ErrnoException) =>
        controller.error(error),
      );
    },
    cancel() {
      stream.destroy();
    },
  });
}
