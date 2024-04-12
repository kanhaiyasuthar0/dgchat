import { auth } from "@/auth";
import ChatContainer from "./ChatContainer";

const ChatContainerWrapper = async () => {
  const data = await auth();

  async function fetchChatHistory(): Promise<string[]> {
    console.log(data?.user);
    try {
      const response = await fetch(
        "https://sandbox.farmstack.digitalgreen.org/ai/chat/chat_history/",
        {
          method: "POST",
          body: JSON.stringify({
            email_id: data?.user?.databaseId,
          }),
          headers: {
            "Content-Type": "application/json", // This header tells the server to expect JSON
          },
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

  const allChatHistory: any = await fetchChatHistory();

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
  return <ChatContainer history={updatedChatHistory} />;
};

export default ChatContainerWrapper;
