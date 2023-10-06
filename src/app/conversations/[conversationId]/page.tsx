import { SendMessageForm } from "@/app/components/SendMessageForm";
import { Message } from "@/app/home/styles";

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
      {messages.map((message: any) => {
        return (
          <Message key={message.content}>
            <strong>{message.user_id}</strong>: {message.content}
          </Message>
        );
      })}
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
