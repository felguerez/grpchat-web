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
  const ws = wsRef.current;
  let keepAlive: NodeJS.Timeout;
  useEffect(() => {
    const isHttps = location.protocol.match("https");
    if (conversationId && ws) {
      const host = isHttps ? "chat-api.felguerez.com" : "localhost:8080";
      const wsProtocol = isHttps ? "wss" : "ws";
      wsRef.current = new WebSocket(
        `${wsProtocol}://${host}/api/conversations/${conversationId}/stream`,
      );

      ws.onopen = (event) => {
        console.log("WebSocket opened:", event);
      };

      keepAlive = setInterval(() => {
        ws.send(JSON.stringify({ type: "keep-alive" }));
      }, 3000);

      wsRef.current.onmessage = (event) => {
        const newMessage = JSON.parse(event.data) as Message;
        console.log("newMessage:", newMessage);

        dispatch({ type: "ADD_MESSAGE", payload: newMessage });
      };
    }

    return () => {
      clearInterval(keepAlive);
      if (ws) {
        ws.close();
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
