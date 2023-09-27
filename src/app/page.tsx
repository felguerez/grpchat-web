'use client';
import React from "react";

export default function Home() {
  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = Array.from(e.currentTarget.elements).filter(element => (element as HTMLInputElement).type === "text").reduce((result, element) => {
      // @ts-ignore
      result[element.name] = element.value;
      return result;
    }, {});

    const res = await fetch('/api/chat/send-message', {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json"
      }),
    });
    const response = await res.json();
    console.log('response:', response);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="flex flex-col gap-2" onSubmit={submit}>
        <input type="text" className="text-black" name="username"/>
        <input type="text" className="text-black" name="content"/>
        <button type="submit">submit</button>
      </form>
    </main>
  )
}
