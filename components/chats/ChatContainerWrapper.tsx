import { auth } from "@/auth";
import ChatContainer from "./ChatContainer";

const ChatContainerWrapper = async ({ id }: { id?: string }) => {
  const data = await auth();
  console.log("🚀 ~ ChatContainerWrapper41 ~ serchParams:", id);

  async function fetchChatHistory(): Promise<string[]> {
    console.log(data?.user);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/ai/chat/chat_history/`,
        {
          method: "POST",
          body: JSON.stringify({
            email_id: "28ccd52e-255d-4b73-b11c-ccf8e2de8cb9", // data?.user?.databaseId,
          }),
          headers: {
            "Content-Type": "application/json", // This header tells the server to expect JSON
          },
          cache: "no-store",
        }
      );
      // console.log(response, "response123");
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      const history: string[] = await response.json();
      return history;
    } catch (error) {
      console.error("Error fetching states:", error);
      return [];
    }
  }

  const fetchBotData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DEPLOYED_URL}/api/chatsession?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // This header tells the server to expect JSON
          },
          cache: "no-store",
          next: {
            tags: ["allbots"],
          },
        }
      );
      // console.log(response, "response123");
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      const data: string[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching states:", error);
      return [];
    }
  };

  const allChatHistory: any = [];
  // const allChatHistory: any = !id ? await fetchChatHistory() : [];
  const activeBotData: any = id ? await fetchBotData() : null;

  function updateKeyInObjects(
    array: Array<Record<string, any>>,
    oldKey: string,
    newKey: string
  ) {
    return array.map((obj) => {
      if (obj.hasOwnProperty(oldKey)) {
        // Create a new object with all properties of the original object
        const newObj = { ...obj };
        // Add the new key with the value of the old key
        newObj[newKey] = newObj[oldKey];
        // Delete the old key
        delete newObj[oldKey];
        return newObj;
      }
      return obj;
    });
  }

  const updatedChatHistory = updateKeyInObjects(
    allChatHistory,
    "output",
    "response"
  );
  return (
    <ChatContainer history={updatedChatHistory} activeBotData={activeBotData} />
  );
};

export default ChatContainerWrapper;
