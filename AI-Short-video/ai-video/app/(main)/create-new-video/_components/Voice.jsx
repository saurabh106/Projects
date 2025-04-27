import React from "react";

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

function Voice() {
  return (
    <div className="mt-5">
      <h2>Video Voice</h2>
      <p className="text-sm text-gray-400">Select Voice for your Video</p>

      <div className="grid grid-cols-2 gap-3">
        {voiceOptions.map((voice, index) => (
          <h2
            key={index}
            className="cursor-po🇮🇳ter p-3 dark:bg-slate-900
             dark:border-white rounded-lg hover:border"
          >
            {voice.name}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default Voice;
