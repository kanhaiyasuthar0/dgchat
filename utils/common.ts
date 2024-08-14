interface ChatSession {
  name: string;
  someid: string;
  creationDate: string; // Using ISO string format for dates
}

// Function to add a chat session
export function addChatSession(name: string, someid: string): void {
  const newSession: ChatSession = {
    name,
    someid,
    creationDate: new Date().toISOString(),
  };

  const existingSessions: ChatSession[] = JSON.parse(
    localStorage?.getItem("chat_sessions") || "[]"
  );
  existingSessions.push(newSession);

  localStorage?.setItem("chat_sessions", JSON.stringify(existingSessions));
}

// Function to get all chat sessions
export function getChatSessions(): ChatSession[] {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage?.getItem("chat_sessions") || "[]");
  } else {
    return [];
  }
}
