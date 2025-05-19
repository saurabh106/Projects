import { inngest } from "./client";
import axios from "axios";
import { createClient } from "@deepgram/sdk";
require("dotenv").config();

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

const BASE_URL = "https://aigurulab.tech";

export const GenerateVideoData = inngest.createFunction(
  { id: "generate-video-data" },
  { event: "generate-video-data" },
  async ({ event, step }) => {
    const { script, topic, title, caption, videoStyle, voice } = event?.data;

    //Generate Audio File MP3

    const GenerateAudioFile = await step.run("GenerateAudioFile", async () => {
      return "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/audio%2F1747673895996.mp3?alt=media&token=25483ebd-a4f2-454b-8dc3-69de945feb2e";
    });

    const GenerateCaptions = await step.run("generateCaptions", async () => {
      const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

      const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        {
          url: GenerateAudioFile,
        },
        {
          model: "nova-3",
        }
      );

      return result.results?.channels[0]?.alternatives[0]?.words;
    });

    //Generate Image Prompt from Script

    //Generate Images using AI

    //Save All Data to DB

    return GenerateCaptions;
  }
);

// const result = await axios.post(
//   BASE_URL + "/api/text-to-speech",
//   {
//     input: script,
//     voice: voice,
//   },
//   {
//     headers: {
//       "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
//       "Content-Type": "application/json", // Content Type
//     },
//   }
// );

// return result.data.audio;


