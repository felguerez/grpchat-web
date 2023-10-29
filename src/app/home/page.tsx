import { Message, Messages } from "@/app/home/styles";

export default async function Page() {
  const { messages } = await getAllMessages();
  return (
    <div>
      <Messages>
        {messages.map((message: any) => {
          return (
            <Message key={message.timestamp}>
              <span>{message.user_id}</span>: {message.content}
            </Message>
          );
        })}
      </Messages>
    </div>
  );
}

async function getAllMessages() {
  const API_URL = `${process.env.API_URL}/api/messages`;
  const response = await fetch(API_URL);
  if (response.ok) {
    const messages = await response.json();
    return { messages };
  }
  return {
    messages: [],
  };
}
