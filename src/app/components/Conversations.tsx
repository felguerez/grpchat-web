"use client";

export function Conversations({ conversations }: { conversations: any[] }) {
  return (
    <>
      {conversations.map((convo) => {
        console.log("convo:", convo);
        return (
          <div key={convo.id}>
            <p>{convo.name} (<span>{convo.members.length} members</span>)</p>
          </div>
        );
      })}
    </>
  );
}
