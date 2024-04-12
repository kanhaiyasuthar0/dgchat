import React, { useState, useEffect } from "react";

const ReadAloudButton = ({ text }: { text: string }) => {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    function setVoicePreference() {
      const voices = window.speechSynthesis.getVoices();
      // Example: Select the first English voice
      const englishVoice = voices.find((voice) => voice.lang.startsWith("en"));
      console.log("🚀 ~ setVoicePreference ~ englishVoice:", englishVoice);
      setVoice(englishVoice || null);
    }

    if ("speechSynthesis" in window) {
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = setVoicePreference;
      }
      setVoicePreference(); // for browsers that don't support onvoiceschanged
    }
  }, []);

  const handleReadAloud = () => {
    if (voice && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice; // Set the selected voice
      window.speechSynthesis.speak(utterance);
    } else {
      alert(
        "Your browser doesn't support text-to-speech or no voice selected."
      );
    }
  };

  return (
    <button
      onClick={handleReadAloud}
      className="p-2 bg-blue-500 text-white rounded"
    >
      Read Aloud
    </button>
  );
};

export default ReadAloudButton;
