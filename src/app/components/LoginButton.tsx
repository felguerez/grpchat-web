"use client";
import React from "react";

export function LoginButton({ url }: {  url: string; }) {
  function onLogin() {
    window.location.assign(url);
  }

  return <button onClick={onLogin}>Log in</button>;
}
