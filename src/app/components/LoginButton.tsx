"use client";
import React from "react";

export function LoginButton({ url }: {  url: string; }) {
  // const url = `${process.env.API_URL}/login`;
  console.log('Object.keys(process.env):', Object.keys(process.env));
  console.log('url:', url);
  function onLogin() {
    window.location.assign(url);
  }

  return <button onClick={onLogin}>Log in</button>;
}
