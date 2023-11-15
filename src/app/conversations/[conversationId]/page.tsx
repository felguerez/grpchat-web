import ChatRoom from "@/app/components/ChatRoom";
import "./styles.scss";

// export default async function Page({
//   params,
// }: {
//   params: { conversationId: string };
// }) {
//   const { conversation, messages } = await getConversation(
//     params.conversationId,
//   );
//   return (
//     <div className="aol-theme">
//       <div className="navbar">
//         <h1 className="title">{conversation.name}</h1>
//       </div>
//       <ChatRoom conversationId={params.conversationId} messages={messages} />
//     </div>
//   );
// }

import { ThreadView } from "@/app/components/ThreadView";

export default ThreadView;

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
