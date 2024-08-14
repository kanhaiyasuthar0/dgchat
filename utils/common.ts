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

export const translateToHindi = async (text: string) => {
  const baseUrl = "https://farmerchat.farmstack.co/language/api/v1";
  const endpoint = `${baseUrl}/translate/`;

  const requestBody = {
    text: text,
    service_provider: "google", // Assuming "google" as the service provider
    source_language_code: "en", // Assuming "en" (English) as the source language code
    target_language_code: "hi", // Assuming "hi" (Hindi) as the target language code
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_API_KEY_AUTH || "",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      return data.translated_text;
    } else {
      console.error("Translation API call failed:", response.statusText);
      return "Translation failed";
    }
  } catch (error) {
    console.error("Error making Translation API call:", error);
    return "Translation failed";
  }
};

export const translateToEnglish = async (text: string) => {
  const baseUrl = "https://farmerchat.farmstack.co/language/api/v1";
  const endpoint = `${baseUrl}/translate/`;

  const requestBody = {
    text: text,
    service_provider: "google", // Assuming "google" as the service provider
    source_language_code: "hi", // Assuming "hi" (Hindi) as the source language code
    target_language_code: "en", // Assuming "en" (English) as the target language code
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_API_KEY_AUTH || "",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      return data.translated_text;
    } else {
      console.error("Translation API call failed:", response.statusText);
      return "Translation failed";
    }
  } catch (error) {
    console.error("Error making Translation API call:", error);
    return "Translation failed";
  }
};
