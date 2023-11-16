import React from "react";
import {ConversationsList} from "@/app/components/ConversationsList";
import {getConversations} from "@/app/conversations/page";
import ChatRoom from "@/app/components/ChatRoom";
import "./styles.scss";
import {getConversation} from "@/app/conversations/[conversationId]/getConversation";
async function fetchData(conversationId: string): Promise<any> {
  return Promise.all([
    getConversations(),
    getConversation(conversationId),
  ]).then(([getConversationsResponse, getConversationResponse]) => {
    const {conversations} = getConversationsResponse;
    console.log('getConversationResponse:', getConversationResponse);
    const {messages} = getConversationResponse;
    return {
      conversations,
      messages,
    };
  });
}

export async function ThreadView({
                                   params: {conversationId},
                                 }: {
  params: {
    conversationId: string;
  };
}) {
  const {conversations, messages} = await fetchData(conversationId);
  if (!conversations.length) return null;
  return (
    <div className="thread-view-container">
      <ConversationsList conversations={conversations}/>
      <ChatRoom conversationId={conversationId} messages={messages}/>
    </div>
  );
}
