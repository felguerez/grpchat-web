"use client";
import "../conversations/conversations.scss";

export function ConversationsList({ conversations }: { conversations: any[] }) {
  return (
    <div className="conversations-list">
      {conversations.map((convo) => {
        console.log("convo:", convo);
        return (
          <div key={convo.id} className="conversation-item">
            <a href={`/conversations/${convo.id}`}>{convo.name} (<span>{convo.members.length} members</span>)</a>
          </div>
        );
      })}
    </div>
  );
}
