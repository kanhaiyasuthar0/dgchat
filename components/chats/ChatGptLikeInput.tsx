// components/ChatInput.tsx

import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { CrossIcon, PaperclipIcon, Send, X } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";
interface MyComponentProps {
  getResponse: (str1: string, str2?: Blob) => void;
  // include other props as needed
}
const ChatGptLikeInput: React.FC<MyComponentProps> = ({
  getResponse,
}: {
  getResponse: (str: any, str2?: Blob) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<Blob | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
  };
  const handleSendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setInputValue(""); // Clear input field
    setFile(null);
    if (file) {
      getResponse(inputValue, file ?? "");
    } else {
      getResponse(inputValue);
    }
  };

  useEffect(() => {
    const textarea = textareaRef?.current!;
    // if (textarea) {
    const maxHeight =
      parseInt(
        window.getComputedStyle(textarea).getPropertyValue("line-height"),
        10
      ) * 2; // Calculate max height for 3 rows
    textarea.style.height = "auto"; // Reset height to recalculate
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    // }
  }, [inputValue]);

  return (
    <div
      className={`relative flex items-end p-2 border border-gray-300 rounded-lg ${
        file ? `h-36` : ""
      }`}
    >
      {file && (
        <div className="absolute top-1 left-2 mt-1 flex items-start space-x-2 p-2 bg-gray-400 border text-white border-gray-300 rounded">
          {file.type.startsWith("image/") ? (
            <>
              <Image
                height={16}
                width={16}
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex flex-col">
                <span className="font-medium text-white">
                  {file instanceof File ? file?.name : ""}
                </span>
                <span className="text-xs text-white">
                  {file.type.split("/")[1]}
                </span>
              </div>
              <button
                onClick={() => setFile(null)} // Add your logic to handle file deletion
                className="p-1 rounded-full bg-gray-500 text-white hover:bg-red-600 focus:outline-none"
              >
                <X size={"10"} />
              </button>
            </>
          ) : (
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">
                {file instanceof File ? file.name : ""}
              </span>
              <span className="text-xs text-gray-500">
                {file instanceof File ? file.type : ""}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="relative flex items-center w-full">
        <input
          id="file-upload"
          type="file"
          className="absolute w-0 h-0"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer p-2">
          <PaperclipIcon size={"20"} className="text-gray-500" />
        </label>

        <textarea
          ref={textareaRef}
          rows={1}
          draggable={false}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              // Checks if Enter is pressed without the Shift key
              e.preventDefault(); // Prevents the default action (new line)
              handleSendMessage(e); // Calls your function
            }
          }}
          placeholder="Type your message..."
          className="flex-1 resize-none bg-transparent focus:ring-0 focus:border-none border-0 focus:outline-none disabled:opacity-100 disabled:bg-transparent"
        />

        <button
          onClick={handleSendMessage} // Replace with your actual send message function
          className="ml-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 transition ease-in-out focus:outline-none"
        >
          <Send size={"15"} />
        </button>
      </div>
    </div>
  );
};

export default ChatGptLikeInput;
