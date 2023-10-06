"use client";
import React from "react";

export function SendMessageForm(props: { conversationId: string }) {
  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = Array.from(e.currentTarget.elements)
      .filter((element) => (element as HTMLInputElement).type === "text")
      .reduce((result, element) => {
        // @ts-ignore
        result[element.name] = element.value;
        return result;
      }, {});

    const body = {
      // @ts-ignore
      content: input.content,
      conversation_id: props.conversationId,
      user_id: "felguerez",
    };


    const res = await fetch("/api/chat/messages", {
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
    <form className="flex gap-2" onSubmit={submit}>
      <input type="text" className="text-black flex-auto" name="content" />
      <button type="submit">↵</button>
    </form>
  );
}
