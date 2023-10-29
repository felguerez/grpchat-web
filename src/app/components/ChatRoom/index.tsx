"use client";
import { useReducer, useEffect, useRef } from "react";
import {
  ChatContainer,
  InputContainer,
  MessageRow,
  MessagesContainer,
} from "@/app/components/ChatRoom/styles";
import { SendMessageForm } from "@/app/components/SendMessageForm";
import "@/app/conversations/[conversationId]/styles.scss";

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
  const wsRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (conversationId && wsRef.current === null) {
      const host = process.env.API_URL?.includes("localhost")
        ? "localhost:8080"
        : "chat-api.felguerez.com";
      wsRef.current = new WebSocket(
        `ws://${host}/api/conversations/${conversationId}/stream`,
      );

      wsRef.current.onopen = (event) => {
        console.log("WebSocket opened:", event);
      };

      wsRef.current.onmessage = (event) => {
        const newMessage = JSON.parse(event.data) as Message;
        console.log("newMessage:", newMessage);

        dispatch({ type: "ADD_MESSAGE", payload: newMessage });
      };
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null; // Reset the ref for future use
      }
    };
  }, [conversationId]);
  const messagesEndRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  // @ts-ignore
  return (
    <ChatContainer theme="aol">
      <MessagesContainer theme="aol">
        {allMessages.map((message, index) => (
          <MessageRow key={`${index}.${message.content}`}>
            <strong>{message.user_id}</strong>: {message.content}
          </MessageRow>
        ))}
        {/* @ts-ignore */}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer theme="aol">
        <SendMessageForm conversationId={conversationId} />
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatRoom;
