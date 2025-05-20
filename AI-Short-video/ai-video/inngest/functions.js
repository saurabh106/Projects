import { generateImageScript } from "@/configs/AiModel";
import { inngest } from "./client";
// import axios from "axios";
import { createClient } from "@deepgram/sdk";
require("dotenv").config();

const ImagePromptScript = `Generate Image prompt of {styles} style with all details for each scene 30 seconds video : script : {script}
- Just Give specifing image prompt depends on the story line 
- do not give camera angle image prompt
- Follow the following schema and return JSON data (Max 4-5 Images)
- [
    {
      imagePrompt:'',
      sceneContent: '<Script Content> 
      }
  ]`





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

// const GenerateAudioFile = await step.run("GenerateAudioFile", async () => {
//       return "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/audio%2F1747673895996.mp3?alt=media&token=25483ebd-a4f2-454b-8dc3-69de945feb2e";
//     });

//     const GenerateCaptions = await step.run("generateCaptions", async () => {
//       const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

//       const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
//         {
//           url: GenerateAudioFile,
//         },
//         {
//           model: "nova-3",
//         }
//       );

//       return result.results?.channels[0]?.alternatives[0]?.words;
//     });

    //Generate Image Prompt from Script
    const GenerateImagePrompt = await step.run(
      "generateImagePrompt",
      async () => {

      


        const FINAL_PROMPT = ImagePromptScript
        .replace(/{style}/g, `The ${videoStyle} style`) // Insert the style directly
          .replace('{script}', script);
    
          // console.log("Final Prompt with Replacements:", FINAL_PROMPT);
          // console.log("🔍 videoStyle:", videoStyle);

        const result = await generateImageScript(FINAL_PROMPT);
    
        // Ensure it's parsed JSON, and validate format
        let parsedResult;
        try {
          parsedResult = typeof result === 'string' ? JSON.parse(result) : result;
          
          if (!Array.isArray(parsedResult)) {
            throw new Error("Parsed result is not an array");
          }
    
          const formatted = parsedResult.map((item) => ({
            imagePrompt: item.imagePrompt || "",
            sceneContent: item.sceneContent || "",
          }));
    
          return formatted;
        } catch (error) {
          console.error("Error parsing or formatting image prompt result:", error);
          throw new Error("Failed to format image prompts correctly");
        }
      }
    );
    

    //Generate Images using AI

    //Save All Data to DB

    return GenerateImagePrompt;
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

//3:43:38 
//npm run dev
//npx convex dev
//localhost :8288
//localhost 3000
