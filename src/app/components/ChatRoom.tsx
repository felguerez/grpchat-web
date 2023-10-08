'use client';
import { Message as MessageStyle } from "@/app/home/styles";
import { useReducer, useEffect } from "react";

interface Message {
  user_id: string;
  content: string;
}

interface Action {
  type: string;
  payload: Message | Message[];
}

const initialState: Message[] = [];

const reducer = (state: Message[], action: Action): Message[] => {
  switch (action.type) {
    case "SET_INITIAL_MESSAGES":
      return [...(action.payload as Message[])];
    case "ADD_MESSAGE":
      return [...state, action.payload as Message];
    default:
      return state;
  }
};

interface ChatRoomProps {
  conversationId: string;
  messages: Message[];
}

const ChatRoom = ({ conversationId, messages }: ChatRoomProps) => {
  const [allMessages, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_INITIAL_MESSAGES", payload: messages });
  }, [messages]);

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8080/api/conversations/${conversationId}/stream`
    );

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data) as Message;
      console.log('newMessage:', newMessage);
      dispatch({ type: "ADD_MESSAGE", payload: newMessage });
    };

    return () => {
      ws.close();
    };
  }, [conversationId]);

  return (
    <div>
      {allMessages.map((message, index) => (
        <MessageStyle key={`${index}.${message.content}`}>
          <strong>{message.user_id}</strong>: {message.content}
        </MessageStyle>
      ))}
    </div>
  );
};

export default ChatRoom;
