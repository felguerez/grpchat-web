import React from "react";

export function SendMessageForm(props: {}) {
  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = Array.from(e.currentTarget.elements).filter(element => (element as HTMLInputElement).type === "text").reduce((result, element) => {
      // @ts-ignore
      result[element.name] = element.value;
      return result;
    }, {});

    console.log('body:', body);

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
    <form className="flex flex-col gap-2" onSubmit={submit}>
      <input type="text" className="text-black" name="user_id"/>
      <input type="text" className="text-black" name="content"/>
      <input type="text" className="text-black" name="conversation_id"/>
      <button type="submit">submit</button>
    </form>
  )
}