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
  const {user_id, content, conversation_id} = body;

  const req = new pb.SendMessageRequest();
  req.setUserId(user_id);
  req.setContent(content);
  req.setConversationId(parseInt(conversation_id, 10));

  console.log('req.toObject():', req.toObject());

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
