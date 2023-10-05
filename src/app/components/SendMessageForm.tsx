"use client";
import React from "react";
import { useAppContext } from "@/app/lib/context/AppContext";

export function SendMessageForm(props: {}) {
  const { sessionId } = useAppContext();

  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = Array.from(e.currentTarget.elements)
      .filter((element) => (element as HTMLInputElement).type === "text")
      .reduce((result, element) => {
        // @ts-ignore
        result[element.name] = element.value;
        return result;
      }, {});

    console.log("body:", body);

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
