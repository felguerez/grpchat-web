import {ChatServiceClient} from "@/proto/chat_grpc_pb";
import {credentials, Metadata} from "@grpc/grpc-js";
import {NextResponse, NextRequest} from "next/server";
import {chat} from "@/proto/chat";
import MessageResponse = chat.MessageResponse;
const pb = require("@/proto/chat_pb");

export async function POST(request: NextRequest) {
  const client = new ChatServiceClient('localhost:50051', credentials.createInsecure(), {interceptors: []});
  let body;
  try {
    body = await request.json();
    if (body) {
      console.log('body:', body);
    }
  } catch (e) {
    console.log("e is", e);
  }
  const {username, content} = body;

  const req = new pb.MessageRequest();
  req.setUsername(username);
  req.setContent(content);
  console.log('Sending request:', req.toObject());

  client.sendMessage(req, new Metadata({}), (error: any, response: MessageResponse) => {  // Annotate error and response types
    if (error) {
      console.error("error says ", error);
      return NextResponse.json({status: 'bad'});
    }
    return NextResponse.json({response: response.toObject()});
  });
  console.log("gRPC call completed");
  return NextResponse.json({status: "gRPC call complete"})
}
