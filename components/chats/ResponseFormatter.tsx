import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "../ui/button";
import Prepopulate from "./Prepulate";
import Markdown from "react-markdown";
// import Markdown from "react-native-simple-markdown";
import ReadAloudButton from "../generic/ReadAloudButton";
import { ClipboardCopy, ThumbsDown, ThumbsUp, Volume2 } from "lucide-react";
import { toast } from "sonner";
import rehypeSanitize from "rehype-sanitize";
// import { RxClipboardCopy } from "react-icons/rx";
import marked from "marked";
import ProcessedResponse from "./ProcessedResponse";
import local from "./process-response.module.css";
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

  function preprocessText(text: string | undefined): any {
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
          <div className="flex justify-end gap-1 mt-2">
            <div className="hover:bg-gray-400 hover:text-white cursor-pointer p-1 rounded-sm">
              <Volume2 onClick={() => toast("Starting...")} size={15} />
            </div>
            <div className="hover:bg-gray-400 hover:text-white cursor-pointer p-1 rounded-sm">
              <ClipboardCopy onClick={() => toast("Copied")} size={15} />
            </div>
            <div className="hover:bg-gray-400 hover:text-white cursor-pointer p-1 rounded-sm">
              <ThumbsUp onClick={() => toast("Liked!")} size={15} />
            </div>
            <div className="hover:bg-gray-400 hover:text-white cursor-pointer p-1 rounded-sm">
              <ThumbsDown onClick={() => toast("Disliked!")} size={15} />
            </div>
          </div>

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
