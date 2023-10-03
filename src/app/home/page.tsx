export default async function Page() {
  const {messages} = await getAllMessages();
  return <div>
    <p>
      welcome home!
    </p>
    {messages.map((message: any) => <pre key={message.timestamp}>{JSON.stringify(message)}</pre>)}
  </div>
}

async function getAllMessages() {
  const API_URL = 'http://localhost:8080/api/messages'
  const response = await fetch(API_URL);
  if (response.ok) {
    const messages = await response.json();
    return {messages};
  }
  return {
    messages: []
  }
}