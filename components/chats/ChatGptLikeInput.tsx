import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { CrossIcon, PaperclipIcon, Send, X, Mic, MicOff } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";
import { MoonLoader, PuffLoader, PulseLoader } from "react-spinners";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import axios from "axios";
import { ignore } from "antd/es/theme/useToken";

// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
// @ts-ignore

export const fetchFile = async (blob) => {
  return new Uint8Array(await blob.arrayBuffer());
};
// @ts-ignore

const convertToOgg = async (webmBlob) => {
  const ffmpeg = new FFmpeg();
  console.log("🚀 ~ convertToOgg ~ webmBlob:", webmBlob);
  if (!ffmpeg.loaded) {
    await ffmpeg.load();
  }

  // Load the WebM file to FFmpeg
  await ffmpeg.writeFile("input.webm", await fetchFile(webmBlob));

  // Run the conversion
  await ffmpeg.exec(["-i", "input.webm", "output.ogg"]);

  // Retrieve the OGG file
  const data = await ffmpeg.readFile("output.ogg");

  // Create a blob from the file data
  // @ts-ignore

  const oggBlob = new Blob([data.buffer], { type: "audio/ogg" });

  return oggBlob;
};

interface MyComponentProps {
  getResponse: (str1: string, str2?: Blob) => void;
  // include other props as needed
}

const ChatGptLikeInput: React.FC<MyComponentProps> = ({
  getResponse,
}: {
  getResponse: (str: any, str2?: Blob, str3?: Blob) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<Blob | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [waitingForReply, setwaitingForReply] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
    e.target.value = ""; // Reset the input after setting the file
  };

  const handleSendMessage = async (
    e: React.SyntheticEvent,
    audioBlobArg: any
  ) => {
    // Check if 'e' exists before preventing default behavior
    // if (e && e.preventDefault) e.preventDefault();
    const audioBlobToUse = audioBlobArg || audioBlob; // Use argument or state
    if (!inputValue.trim() && !audioBlobToUse && !file) return;
    setInputValue(""); // Clear input field
    setFile(null);
    setwaitingForReply(true);

    // Check if both audio and image are present
    if (audioBlobToUse && file) {
      await getResponse(inputValue, file, audioBlobToUse); // Send both image and audio
    } else if (audioBlobToUse) {
      await getResponse(inputValue, undefined, audioBlobToUse); // Send only audio
      setAudioBlob(null);
    } else if (file) {
      await getResponse(inputValue, file); // Send only image
    } else {
      await getResponse(inputValue); // Send text only
    }
    setAudioBlob(null);
    setwaitingForReply(false);
  };

  useEffect(() => {
    const textarea = textareaRef?.current!;
    const maxHeight =
      parseInt(
        window.getComputedStyle(textarea).getPropertyValue("line-height"),
        10
      ) * 2; // Calculate max height for 3 rows
    textarea.style.height = "auto"; // Reset height to recalculate
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, [inputValue]);
  // @ts-ignore
  const audioBlobToBase64 = (audioBlob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        //@ts-ignore
        const base64String = reader.result.split(",")[1]; // Remove the data URL prefix
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  // @ts-ignore

  async function transcribeAudioFileAPI(audioFile) {
    try {
      // Create a FormData object to hold the audio file
      const formData = new FormData();
      formData.append("audio", audioFile, "audio.ogg"); // 'audio' must match the key expected by the backend

      // Make a POST request to the API endpoint with the audio file

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/ai/chat/transcribe_audio/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Return the transcription from the response
      return response.data.transcription;
    } catch (error) {
      console.error(
        "Error in transcription:",
        // @ts-ignore

        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  // Handle audio recording
  const handleStartRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          console.log("Microphone access granted:", stream);

          const mimeType = "audio/webm"; // Change this to 'audio/ogg' if 'webm' is not supported

          if (!MediaRecorder.isTypeSupported(mimeType)) {
            console.warn(
              `${mimeType} is not supported on this browser, using default settings.`
            );
          }

          const mediaRecorder = new MediaRecorder(stream, {
            mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : "",
          });

          mediaRecorderRef.current = mediaRecorder;
          setIsRecording(true);
          // @ts-ignore

          const audioChunks = [];

          mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
              audioChunks.push(event.data); // Add each chunk of data to the array
              console.log("Data available:", event.data.size);
            } else {
              console.warn("No data available in this event.");
            }
          };

          mediaRecorder.onstop = async () => {
            console.log("Recording stopped");

            // Check if audioChunks has been populated
            // @ts-ignore

            console.log(audioChunks, "audioChunks");

            if (audioChunks.length > 0) {
              // @ts-ignore

              const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
              console.log("🚀 ~ mediaRecorder.onstop= ~ audioBlob:", audioBlob);

              // Convert to OGG if needed
              if (audioBlob.size > 0) {
                const oggBlob = await convertToOgg(audioBlob);
                console.log("🚀 ~ mediaRecorder.onstop= ~ oggBlob:", oggBlob);
                const base64OggBlob = await audioBlobToBase64(oggBlob);
                // console.log("🚀 ~ mediaRecorder.onstop= ~ oggBlob:", oggBlob);
                setAudioBlob(oggBlob); // Set the audio blob to state
                // const query = await transcribeAudioFileAPI(oggBlob);
                // console.log("🚀 ~ mediaRecorder.onstop= ~ query:", query);
                // @ts-ignore

                handleSendMessage(undefined, oggBlob);
              } else {
                console.warn("Recorded audio blob is empty!");
              }
            } else {
              console.warn("No audio chunks were collected.");
            }

            // Reset chunks after use
            stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
          };

          // Start the recording process
          mediaRecorder.start();
          console.log("Recording started");

          // // Stop the recording after 5 seconds (to allow time for data collection)
          // setTimeout(() => {
          //   mediaRecorder.stop();
          // }, 5000);
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

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
                onClick={() => setFile(null)}
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

        {/* Audio Recording Button */}
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          className={`ml-2 px-2 py-2 rounded-full transition-transform ${
            isRecording
              ? "bg-red-500 text-white animate-pulse"
              : "bg-gray-200 text-gray-600"
          } hover:bg-gray-300 focus:outline-none mr-2`}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <textarea
          ref={textareaRef}
          rows={1}
          draggable={false}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              // @ts-ignore

              handleSendMessage(e);
            }
          }}
          placeholder="Type your message..."
          className="flex-1 resize-none bg-transparent focus:ring-0 focus:border-none border-0 focus:outline-none disabled:opacity-100 disabled:bg-transparent"
        />

        <button
          disabled={waitingForReply || (!inputValue && !audioBlob)}
          // @ts-ignore

          onClick={handleSendMessage}
          className="ml-2 disabled:bg-gray-200 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 transition ease-in-out focus:outline-none"
        >
          {waitingForReply ? (
            <PulseLoader
              className="text-sm dark:text-white text-black"
              loading
              size={"2"}
            />
          ) : (
            <Send size={"15"} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatGptLikeInput;
