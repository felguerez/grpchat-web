"use client";

export function Conversations({ conversations }: { conversations: any[] }) {
  return (
    <>
      {conversations.map((convo) => {
        console.log("convo:", convo);
        return (
          <div key={convo.id}>
            <a href={`/conversations/${convo.id}`}>{convo.name} (<span>{convo.members.length} members</span>)</a>
          </div>
        );
      })}
    </>
  );
}
