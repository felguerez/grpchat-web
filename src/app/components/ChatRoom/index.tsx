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
    if (messages) {
      dispatch({ type: "SET_INITIAL_MESSAGES", payload: messages });
    }
  }, [messages]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let keepAlive: NodeJS.Timeout;
    const isHttps = location.protocol.startsWith("https:");
    if (conversationId && wsRef.current === null) {
      const host = isHttps ? "chat-api.felguerez.com" : "localhost:8080";
      console.log("connecting to host:", host);
      const wsProtocol = isHttps ? "wss" : "ws";
      wsRef.current = new WebSocket(
        `${wsProtocol}://${host}/api/conversations/${conversationId}/stream`,
      );

      wsRef.current.onopen = (event: Event) => {
        console.log("WebSocket opened:", event);
      };

      wsRef.current.onclose = (event: CloseEvent) => {
        console.log("WebSocket closed:", event);
      };

      wsRef.current.onmessage = (event: MessageEvent) => {
        const newMessage = JSON.parse(event.data) as Message;
        if (newMessage.user_id) {
          console.log("newMessage:", newMessage);
          dispatch({ type: "ADD_MESSAGE", payload: newMessage });
        }
      };

      wsRef.current.onerror = (event) => {
        console.error("WebSocket error observed:", event);
      };

      keepAlive = setInterval(() => {
        const wsCurrent = wsRef.current;
        if (wsCurrent && wsCurrent.readyState === WebSocket.OPEN) {
          wsCurrent.send(JSON.stringify({ type: "keep-alive" }));
        }
      }, 3000);
    }

    return () => {
      clearInterval(keepAlive);
      const wsCurrent = wsRef.current;
      if (wsCurrent) {
        wsCurrent.close();
        wsRef.current = null;
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
