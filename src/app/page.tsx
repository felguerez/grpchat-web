import React from "react";
import { cookies } from "next/headers";
import "./page.scss";
import { LoginButton } from "@/app/components/LoginButton";

export default function Home() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId");
  const url = `${process.env.API_URL}/login`;
  function onLogin() {
    window.location.assign(`${process.env.API_URL}/login`);
  }

  return (
    <main className="main">
      <h1>Welcome to cover chat</h1>
      <p>
        Chat with your squad-mates in real-time, through the magic of gRPC and
        WebSockets.
      </p>
      {sessionId ? (
        <a href="/conversations">view your conversations</a>
      ) : (
        <LoginButton url={url} />
      )}
    </main>
  );
}
