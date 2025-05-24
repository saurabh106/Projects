import { generateImageScript } from "@/configs/AiModel";
import { inngest } from "./client";
import axios from "axios";
import { createClient } from "@deepgram/sdk";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
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
  ]`;

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
    const { script, topic, title, caption, videoStyle, voice, recordId } =
      event?.data;
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    //Generate Audio File MP3

    const GenerateAudioFile = await step.run("GenerateAudioFile", async () => {
      const result = await axios.post(
        BASE_URL + "/api/text-to-speech",
        {
          input: script,
          voice: voice,
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
            "Content-Type": "application/json", // Content Type
          },
        }
      );

      return result.data.audio;
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
    const GenerateImagePrompt = await step.run(
      "generateImagePrompt",
      async () => {
        const FINAL_PROMPT = ImagePromptScript.replace(
          /{style}/g,
          `The ${videoStyle} style`
        ) 
          .replace("{script}", script);

      

        const result = await generateImageScript(FINAL_PROMPT);

        // Ensure it's parsed JSON, and validate format
        let parsedResult;
        try {
          parsedResult =
            typeof result === "string" ? JSON.parse(result) : result;

          if (!Array.isArray(parsedResult)) {
            throw new Error("Parsed result is not an array");
          }

          const formatted = parsedResult.map((item) => ({
            imagePrompt: item.imagePrompt || "",
            sceneContent: item.sceneContent || "",
          }));

          return formatted;
        } catch (error) {
          console.error(
            "Error parsing or formatting image prompt result:",
            error
          );
          throw new Error("Failed to format image prompts correctly");
        }
      }
    );

    //Generate Images using AI
    const GenerateImages = await step.run("generateImages", async () => {
      let images = [];
      images = await Promise.all(
        GenerateImagePrompt.map(async (element) => {
          const result = await axios.post(
            BASE_URL + "/api/generate-image",
            {
              width: 1024,
              height: 1024,
              input: element?.imagePrompt,
              model: "sdxl", //'flux'
              aspectRatio: "1:1", //Applicable to Flux model only
            },
            {
              headers: {
                "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
                "Content-Type": "application/json", // Content Type
              },
            }
          );
          console.log(result.data.image);
          return result.data.image;
        })
      );
      return images;
    });

    //Save All Data to DB
    const UpdateDB = await step.run("UpdatedDB", async () => {
      const result = await convex.mutation(api.videoData.UpdateVideoRecord, {
        recordId: recordId,
        audioUrl: GenerateAudioFile,
        captionJson: GenerateCaptions,
        images: GenerateImages,
      });
      return result;
    });

    return 'Exceuted Successfully';
  }
);
