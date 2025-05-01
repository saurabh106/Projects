import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const voiceOptions = [
  {
    value: "af_sarah",
    name: "us Sarah(Female)",
  },
  {
    value: "af_river",
    name: "us River(Female)",
  },
  {
    value: "af_alloy",
    name: "us Alloy(Female)",
  },
  {
    value: "af_aoede",
    name: "us Aoede(Female)",
  },
  {
    value: "af_bella",
    name: "us Bella(Female)",
  },

  {
    value: "hf_alpha",
    name: "🇮🇳 Alpha",
  },
  {
    value: "hf_beta",
    name: "🇮🇳 Beta(Female)",
  },
  {
    value: "hm_omega",
    name: "🇮🇳 Omega(Male)",
  },
  {
    value: "hm_psi",
    name: "🇮🇳 Psi(Male)",
  },
];

function Voice({onHandleInputChange}) {
  const [selectedVoice, setSelectedVoice] = useState();
  return (
    <div className="mt-5">
      <h2>Video Voice</h2>
      <p className="text-sm text-gray-400">Select Voice for your Video</p>
      <ScrollArea className="h-[150px] w-full">
        <div className="grid grid-cols-2 gap-3">
          {voiceOptions.map((voice, index) => (
            <h2
              key={index}
              className={`cursor-pointer p-3 dark:bg-slate-900
             dark:border-white rounded-lg hover:border ${voice.name == selectedVoice && "border"}`}
              onClick={() => {
                setSelectedVoice(voice.name);
                onHandleInputChange("voice", voice.value);
              }}
            >
              {voice.name}
            </h2>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default Voice;
