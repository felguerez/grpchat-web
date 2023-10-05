"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the shape of the context state
interface AppContextState {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  sessionId: string;
}

// Create the context with an optional default value
const AppContext = createContext<AppContextState | undefined>(undefined);

// Create a provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const { search } = window.location;
  console.log("window.location:", window.location);
  console.log("query:", search);

  useEffect(() => {
    const parsedQuery = search
      .slice(1)
      .split("&")
      .reduce((parsed, pair) => {
        const [key, value] = pair.split("=");
        parsed[key] = value;
        return parsed;
      }, {} as any);
    if (parsedQuery.hasOwnProperty("session_id")) {
      setSessionId(parsedQuery.session_id);
      window.location.search = "";
    }
  }, [search]);

  return (
    <AppContext.Provider value={{ username, setUsername, sessionId }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
