import { GoogleGenAI } from '@google/genai';

export async function generateScript() {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const model = 'models/gemini-2.5-flash-preview-04-17';

  const generationConfig = {
    responseMimeType: 'application/json',
  };

  const prompt = `The user wants two different 30-second video scripts for a kids' story.
Each script should be just the story text, without scene descriptions or anything in braces.
The final output must be a JSON object following the specified schema.

**Script 1 Idea:** A simple story about a lost kitten finding its way home.
**Script 2 Idea:** A story about a little star who learns to shine brightly.

**Constraint Checklist & Confidence Score:**
1. Two different scripts? Yes.
2. 30 seconds video length? Yes, I'll aim for roughly 75-90 words per script, which is a good estimate for 30 seconds of narration.
3. Topic: Kids Story? Yes.
4. No Scene description? Yes.
5. No Braces? Yes.
6. Plain story text only? Yes.
7. JSON Format? Yes.
8. Follow Schema? Yes.

Confidence Score: 5/5


Both drafts seem suitable. They are simple, positive, fit the time constraint, and adhere to all negative constraints. I will now format them according to the JSON schema.

\`\`\`json
{
  "script": [
    {
      "content": "Once, lived a fluffy bunny named Pip. Pip loved carrots, but today, the carrot patch was empty! Oh no! Pip hopped sadly through the meadow. Suddenly, he saw his friend, Squeaky the squirrel, burying something. It was a big, orange carrot! Squeaky grinned, \\"I saved one for you, Pip!\\" Pip munched happily. Sharing makes everything better!"
    },
    {
      "content": "Leo the lion cub couldn't roar. He tried, \\"Mew!\\" He tried, \\"Squeak!\\" His friends giggled. Leo felt sad. His mama nuzzled him. \\"Keep practicing, little one. Your roar is inside you.\\" Leo took a deep breath, puffed out his chest, and let out a tiny... \\"Roar-let!\\" It wasn't big, but it was his! Mama lion smiled proudly. Leo knew, one day, his roar would be mighty."
    }
  ]
}
\`\`\``;

  const response = await ai.models.generateContent({
    model,
    generationConfig,
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
  });

  const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini did not return a valid text response.");
  }

  return { text };
}

export async function generateImageScript(videoStyle, script) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const model = 'models/gemini-2.5-flash-preview-04-17';
  const generationConfig = {
    responseMimeType: 'application/json',
  };

  const prompt = `
Generate image prompts in ${videoStyle} style for each scene of a 30-second video based on this script:

"${script}"

Instructions:
- Just give specifying image prompts based on the storyline.
- Do not include camera angles.
- Return a JSON array (Max 4-5 items) in the following format:

[
  {
    "imagePrompt": "<detailed image prompt>",
    "sceneContent": "<script segment>"
  }
]

Constraints:
- Ensure each image prompt is richly descriptive and directly tied to one scene.
- Follow the intended style: ${videoStyle}.
`;

  const response = await ai.models.generateContent({
    model,
    generationConfig,
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
  });

  const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;

  // console.log("📝 Raw Response from Gemini:", text);

  if (!text) {
    throw new Error("Gemini did not return a valid image script response.");
  }

  const cleanedText = text.replace(/```json|```/g, '').trim();
  

  try {
    const json = JSON.parse(cleanedText);
    if (!Array.isArray(json)) {
      throw new Error("Returned data is not a valid array.");
    }

    return json;
  } catch (err) {
   
    throw new Error("Failed to parse Gemini JSON response.");
  }
}
