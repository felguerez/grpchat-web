'use client';
import React from "react";
import {SendMessageForm} from "@/app/components/SendMessageForm";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>welcome to cover chat</h1>
      <button onClick={() => window.location.href = 'http://localhost:50051/login'}>Log in with Spotify</button>
      <SendMessageForm/>
    </main>
  )
}
