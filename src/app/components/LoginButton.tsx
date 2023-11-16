"use client";
import React from "react";

export function LoginButton({ url }: {  url: string; }) {
  console.log('url:', url);
  function onLogin() {
    window.location.assign(url);
  }

  return <button onClick={onLogin}>Log in</button>;
}
