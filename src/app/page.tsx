import React from "react";
import { NewConversationForm } from "@/app/components/NewConversationForm";
import {cookies, headers} from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("session_id");
  console.log('sessionId:', sessionId);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>welcome to cover chat</h1>
      <NewConversationForm />
    </main>
  );
}
