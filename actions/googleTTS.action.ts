"use server";

import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import path from "path";
import * as franc from "franc";

const languageCodeMapping = {
  eng: "en-US", // English
  hin: "hi-IN", // Hindi
  spa: "es-ES", // Spanish
  fra: "fr-FR", // French
  // Add more language mappings here
};

// Function to detect language and return the corresponding Google TTS language code
function detectLanguage(text: string): string {
  // Detect language using franc

  const lang = franc.francAll(text)[0][0]; // Use franc.all() to get the best match
  console.log("Detected language code:", lang);

  // Return corresponding Google TTS language code or default to "en-US" if not found
  return languageCodeMapping[lang] || "en-US";
}

// Server Action for Text-to-Speech
export async function generateSpeech(text) {
  console.log("🚀 ~ generateSpeech ~ text:", text);
  //   const text = formData.get("text");
  if (!text) {
    throw new Error("Text is required");
  }

  const client = new TextToSpeechClient({
    keyFilename: path.join(process.cwd(), "actions/creds.json"), // Replace with your credentials path
  });

  // Detect language from the text
  const detectedLanguageCode = detectLanguage(text);

  // Prepare the request for Google Cloud TTS
  const request = {
    input: { text },
    voice: { languageCode: detectedLanguageCode, ssmlGender: "NEUTRAL" }, // Use detected language code
    audioConfig: { audioEncoding: "MP3" },
  };

  // Call the Text-to-Speech API
  const [response] = await client.synthesizeSpeech(request);
  console.log("🚀 ~ generateSpeech ~ response:", response);

  return {
    audioContent: response.audioContent.toString("base64"),
  };
  //   return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
}
