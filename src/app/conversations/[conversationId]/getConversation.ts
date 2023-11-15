export async function getConversation(conversationId: string) {
  const API_URL = `${process.env.API_URL}/api/chat/conversations/${conversationId}`;
  console.log("API_URL:", API_URL);
  const response = await fetch(API_URL);
  if (response.ok) {
    return response.json();
  }
  return Promise.resolve({
    conversation: {},
  });
}