import ChatRoom from "@/app/components/ChatRoom";
import './styles.scss';

export default async function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversation, messages } = await getConversation(
    params.conversationId,
  );
  return (
    <div className="aol-theme">
      <div className="navbar">
        <h1 className="title">{conversation.name}</h1>
        <button>Home</button>
        <button>Toggle Conversations</button>
      </div>
      <ChatRoom conversationId={params.conversationId} messages={messages} />
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
