import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "../ui/button";
import Prepopulate from "./Prepulate";
import Markdown from "react-markdown";
// import Markdown from "react-native-simple-markdown";
import ReadAloudButton from "../generic/ReadAloudButton";
import { ClipboardCopy, ThumbsDown, ThumbsUp, Volume2, X } from "lucide-react";
import { toast } from "sonner";
import rehypeSanitize from "rehype-sanitize";
import { generateSpeech } from "@/actions/googleTTS.action";
import { useEffect, useRef, useState } from "react";
import { Popover } from "antd";
// import { Volume2, ClipboardCopy, ThumbsUp, ThumbsDown, Loader, X } from "react-feather"; // You can replace with your own icons
// import { RxClipboardCopy } from "react-icons/rx";
// import marked from "marked";
// import ProcessedResponse from "./ProcessedResponse";
// import local from "./process-response.module.css";
import WaveSurfer from "wavesurfer.js";
import { Button } from "../ui/button";
const ResponseFormatter = ({
  exchange,
  getResponse,
  copyToClipboard,
}: {
  exchange?: {
    youtube_url: string;
    query_response: string;
    condensed_question: string;
    follow_up_questions: string[];
    query: string;
  };
  getResponse: (inputString: string, file?: File) => any;
  copyToClipboard?: (inputString: string) => void;
}) => {
  console.log("🚀 ~ copyToClipboard:", copyToClipboard);
  console.log(exchange);

  function transformDriveLink(link: string) {
    // Regular expression to check for drive.google.com and replace /view with /preview
    const regex =
      /https?:\/\/drive.google.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/;

    // Check if the link matches the regex
    const match = link.match(regex);

    if (match) {
      // If it matches, transform /view to /preview
      // const fileId = match?.[1];
      const transformedLink = link.replace("/view", "/preview");
      return transformedLink;
    } else {
      // If it doesn't match, return null
      return null;
    }
  }

  function extractVideoId(url: string) {
    // Match the video ID from the URL using a regular expression
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=|watch\?feature=share&v=))([^?&"'>]+)/;

    // Execute the regular expression and get the first capturing group
    const match = url.match(regex);

    if (match && match?.[1]) {
      return match[1];
    } else {
      // Return null or handle the case when no match is found
      return null;
    }
  }

  function sanitizeTextForTTS(text: string): string {
    // Remove markdown symbols like **, __, ##, etc.
    let sanitizedText = text
      .replace(/\*\*/g, "") // Remove bold (**)
      .replace(/__|~~/g, "") // Remove other markdown symbols like __, ~~
      .replace(/<\/?[^>]+(>|$)/g, "") // Remove any HTML tags
      .replace(/[-*#>]/g, "") // Remove list symbols (-, *, #, >)
      .replace(/\n\s*\n/g, ". ") // Convert newlines to periods
      .replace(/\n/g, " "); // Remove single newlines

    // Further cleanup (if needed), replace specific TTS-problematic symbols
    sanitizedText = sanitizedText.replace(/&/g, "and");

    return sanitizedText;
  }

  const [audioUrl, setAudioUrl] = useState(null); // Holds the audio URL created from the binary data
  const [isPlaying, setIsPlaying] = useState(false); // Controls play/pause state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  function preprocessText(text: string | undefined): any {
    console.log("🚀 ~ preprocessText ~ text:", text);
    if (!text) return "";

    // Ensure correct newline handling for lists by only adding double newlines where appropriate
    // Avoid changing single newlines that follow list item markers
    // text = text.replace(/\n(?![\n-])/g, "\n\n");

    // // Escape Markdown special characters that aren't part of list formatting or other intentional Markdown usage
    // // Adjusted to avoid escaping dashes used in lists
    // const specialCharactersPattern = /([\\`*_{}[\]()#+!.])/g; // Excluding "-" which is used in lists
    // text = text.replace(specialCharactersPattern, "\\$&");

    // // Convert URLs to Markdown links only if not already formatted as Markdown
    // text = text.replace(
    //   /(?<!\]\()(https?:\/\/[^\s\)]+)(?!\))/g,
    //   (url) => `[${url}](${url})`
    // );

    // return text.split("\n").map((line, index) => {
    //   if (line.trim().startsWith("-")) {
    //     return <li key={index}>{line.trim().substring(1).trim()}</li>;
    //   }
    //   return <p key={index}>{line}</p>;
    // });
    return text;
  }

  const processResponse = preprocessText(exchange?.query_response);

  const hide = () => {
    setOpen(false);
  };

  // Handle opening/closing of the Popover
  const handleOpenChange = async (openState) => {
    setOpen(openState);
    if (openState && processResponse) {
      await tts(processResponse); // Generate audio when the Popover opens
    }
  };

  // Function to convert base64 string to Uint8Array (binary data)
  const base64ToUint8Array = (base64) => {
    const binaryString = window.atob(base64); // Decode base64
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);

    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }

    return bytes;
  };

  // Function to fetch audioContent and play it
  const tts = async (text) => {
    console.log("🚀 ~ tts ~ text:", text);
    setIsLoading(true);
    setError(null);
    setAudioUrl(null); // Reset any existing audio

    try {
      let sanitisedText = sanitizeTextForTTS(text);
      // Assume generateSpeech returns the audioContent as a binary response
      const response = await generateSpeech(sanitisedText);
      console.log("🚀 ~ tts ~ response:", response);
      console.log(response && response.audioContent, "response.audioContent");
      if (response.audioContent) {
        const audioBinary = base64ToUint8Array(response.audioContent);
        // Convert binary audioContent to a Blob
        const audioBlob = new Blob([audioBinary], {
          type: "audio/mp3", // Ensure correct MIME type
        });

        // // Convert base64 or binary audioContent to a Blob
        // const audioBlob = new Blob([new Uint8Array(response.audioContent)], {
        //   type: "audio/mp3",
        // });

        // Create an object URL from the Blob
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("🚀 ~ tts ~ audioUrl:", audioUrl);
        setAudioUrl(audioUrl); // Set the audio URL for playback

        setIsLoading(false);
        toast("Audio generated. Click play to listen.");
      } else {
        throw new Error("Failed to retrieve audio content");
      }
    } catch (error) {
      setError("Failed to generate speech. Please try again.");
      setIsLoading(false);
    }
  };

  // Function to handle play/pause
  const togglePlay = () => {
    const audioElement = document.getElementById("audioPlayer");
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play();
        setIsPlaying(true);
      }
    }
  };

  // Function to stop the audio
  const stopAudio = () => {
    const audioElement = document.getElementById("audioPlayer");
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0; // Reset the audio to the start
      setIsPlaying(false);
    }
  };

  // // Initialize WaveSurfer instance
  // useEffect(() => {
  //   if (audioRef.current && !waveSurfer) {
  //     const wave = WaveSurfer.create({
  //       container: audioRef.current,
  //       waveColor: "#ddd",
  //       progressColor: "#4A90E2",
  //       height: 80,
  //       barWidth: 2,
  //       cursorWidth: 1,
  //       responsive: true,
  //     });
  //     setWaveSurfer(wave);
  //   }
  // }, [audioRef, waveSurfer]);

  return (
    <div className="text-pretty mt-2">
      <div className="w-full flex flex-col gap-2 align-middle dark:bg-gray-800 dark:text-white rounded-lg px-4 py-2 shadow">
        <div className="flex gap-5">
          <span className=" mr-1">
            <Avatar className="h-7 w-7 p-1 bg-gray-300 dark:bg-gray-300">
              <AvatarImage height={8} width={8} src="./secondary-logo.svg" />
              <AvatarFallback>FC</AvatarFallback>
            </Avatar>{" "}
          </span>
          <span className="w-full">
            {/* <Markdown
              // styles={markdownStyles}
              className="markdown-response leading-loose"
            >
            </Markdown> */}
            {/* {processResponse} */}

            <Markdown className={"prose dark:text-white dark:prose-dark"}>
              {processResponse}
            </Markdown>
            {/* <Markdown
              children={processResponse}
              rehypePlugins={rehypeSanitize}
            /> */}
          </span>
        </div>
        {/* <ReadAloudButton text={processResponse} /> */}
        <div className="flex-col pl-14">
          {exchange?.youtube_url && (
            <div className="relative mt-2 w-full max-w-xl mx-auto">
              <div className="video-container" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={
                    transformDriveLink(
                      exchange?.youtube_url.replace("watch?v=", "embed/")
                    ) ??
                    `https://www.youtube.com/embed/${extractVideoId(
                      exchange?.youtube_url.replace("watch?v=", "embed/")
                    )}`
                  }
                  title="YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  loading="lazy"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          )}

          {/* showing options */}

          <div className="flex justify-end gap-1 mt-2 items-center">
            <div className="hover:bg-gray-400 hover:text-white cursor-pointer p-1 rounded-sm h-fit">
              {audioUrl && (
                <audio
                  id="audioPlayer"
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  controls={true}
                  autoPlay={true}
                />
              )}
            </div>

            <div className="hover:bg-gray-400 hover:text-white cursor-pointer p-1 rounded-sm h-fit">
              <Volume2
                onClick={async () => {
                  toast("Starting...");
                  await tts(processResponse); // Trigger TTS and auto-play
                }}
                size={15}
              />
            </div>

            <div className="hover:bg-gray-400 hover:text-white cursor-pointer p-1 rounded-sm h-fit">
              <ClipboardCopy
                onClick={() => {
                  toast("Copied");
                }}
                size={15}
              />
            </div>
            <div className="hover:bg-gray-400 hover:text-white cursor-pointer p-1 rounded-sm h-fit">
              <ThumbsUp onClick={() => toast("Liked!")} size={15} />
            </div>
            <div className="hover:bg-gray-400 hover:text-white cursor-pointer p-1 rounded-sm h-fit">
              <ThumbsDown onClick={() => toast("Disliked!")} size={15} />
            </div>
          </div>
          {/* {audioUrl && (
            <audio
              id="audioPlayer"
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              controls={true}
            />
          )} */}
          {/* Audio player */}
          {console.log(audioUrl, "audioUrl******")}

          {/* <div ref={audioRef}></div> WaveSurfer container */}
          {/* Follow-up Questions */}
          {exchange?.follow_up_questions &&
            exchange?.follow_up_questions?.length > 0 && (
              <div className="mt-5">
                <p className="font-semibold mb-2">Follow-up Questions:</p>
                <Prepopulate
                  onClick={getResponse}
                  data={exchange?.follow_up_questions}
                />
              </div>
            )}
          {/* <ProcessedResponse /> */}
        </div>
      </div>
    </div>
  );
};

export default ResponseFormatter;
