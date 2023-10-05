import { NewConversationForm } from "@/app/components/NewConversationForm";
import {Conversations} from "@/app/components/Conversations";

export default async function Page() {
  const { conversations } = await getConversations();
  if (!conversations.length) {
    return (
      <div>
        No conversations yet!
        <NewConversationForm />
      </div>
    );
  }
  return <Conversations conversations={conversations} />
}

async function getConversations() {
  const API_URL = "http://localhost:3000/api/chat/conversations";
  const response = await fetch(API_URL);
  if (response.ok) {
    return response.json();
  }
  return {
    conversations: [],
  };
}
