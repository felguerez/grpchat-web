import React from "react";
import { cookies } from "next/headers";
import "./page.scss";

export default function Home() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId");
  return (
    <main className="main">
      <h1>welcome to cover chat</h1>
      {sessionId ? (
        <a href="/conversations">view your conversations</a>
      ) : (
        <a href={`${process.env.API_URL}/login`}>log in</a>
      )}
    </main>
  );
}
