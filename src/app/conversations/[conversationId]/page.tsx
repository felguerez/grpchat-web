import { SendMessageForm } from "@/app/components/SendMessageForm";
import { Message } from "@/app/home/styles";
import ChatRoom from "@/app/components/ChatRoom";

export default async function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversation, messages } = await getConversation(
    params.conversationId,
  );
  return (
    <div>
      <h1>{conversation.name}</h1>
      <ChatRoom conversationId={params.conversationId} messages={messages} />
      <SendMessageForm conversationId={params.conversationId} />
    </div>
  );
}

async function getConversation(conversationId: string) {
  const API_URL = `http://localhost:3000/api/chat/conversations/${conversationId}`;
  const response = await fetch(API_URL);
  if (response.ok) {
    return response.json();
  }
  return {
    conversation: {},
  };
}