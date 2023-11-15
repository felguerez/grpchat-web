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

