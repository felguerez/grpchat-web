import { NewConversationForm } from "@/app/components/NewConversationForm";
import { ConversationsList } from "@/app/components/ConversationsList";

export default async function Page() {
  const { conversations } = await getConversations();
  if (!conversations.length) {
    return (
      <div className="main">
        No conversations yet!
        <NewConversationForm />
      </div>
    );
  }
  return <ConversationsList conversations={conversations} />;
}

export async function getConversations() {
  const API_URL = "http://localhost:3000/api/chat/conversations";
  const response = await fetch(API_URL);
  if (response.ok) {
    return response.json();
  }
  return {
    conversations: [],
  };
}
