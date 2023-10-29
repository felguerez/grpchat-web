import React from "react";
import { cookies, headers } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("session_id");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>welcome to cover chat</h1>
      {sessionId ? (
        <a href="/conversations">view your conversations</a>
      ) : (
        <a href={`${process.env.API_URL}/login`}>log in</a>
      )}
      <p>let's get it started in here</p>
    </main>
  );
}
