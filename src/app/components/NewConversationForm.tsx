'use client';
import React, { useState } from "react";

export function NewConversationForm(props: {}) {
  const [name, setName] = useState("");

  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = { name };

    const res = await fetch("/api/chat/conversations", {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    const response = await res.json();
    console.log("response:", response);
  }

  return (
    <div>
      <h1>New Conversation</h1>
      <form className="flex gap-2" onSubmit={submit}>
        <input
          type="text"
          className="text-black flex-auto"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">↵</button>
      </form>
    </div>
  );
}
