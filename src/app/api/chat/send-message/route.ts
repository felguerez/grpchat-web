import {ChatServiceClient} from "@/proto/chat_grpc_pb";
import {credentials, Metadata} from "@grpc/grpc-js";
import {NextRequest, NextResponse} from "next/server";
import {chat} from "@/proto/chat";
import {get} from "@/app/lib/request/get";
import MessageResponse = chat.SendMessageResponse;

const pb = require("@/proto/chat_pb");

export async function POST(request: NextRequest) {
  const client = new ChatServiceClient('localhost:50051', credentials.createInsecure(), {interceptors: []});

  const body = await get(request);

  if (body instanceof NextResponse) {
    return body;
  }
  const {username, content} = body;

  const req = new pb.SendMessageRequest();
  req.setUserId(username);
  req.setContent(content);
  req.setConversationId(420);

  return new Promise((resolve) => {
    client.sendMessage(req, new Metadata({}), (error: any, response: MessageResponse) => {
      if (error) {
        console.error("error says ", error);
        resolve(NextResponse.json({status: 'bad'}, {status: 500}));
      } else {
        console.log("gRPC call completed");
        resolve(NextResponse.json({response: response.toObject()}));
      }
    });
  });
}
