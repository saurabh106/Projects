"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateWithGemini } from "@/app/lib/gemini";

// --- Simulate Job Search (Mock API) ---
// In a real app, you would swap this with JSearch, LinkedIn API, or Puppeteer.
async function fetchJobsFromAPI(preferences) {
  const { role, location, salary } = preferences;
  
  // Real-world companies to make the demo feel authentic
  const companies = [
    "TechFlow", "Google", "Microsoft", "Stripe", "Netflix", "Spotify", "Amazon", "ByteDance", "Airbnb", "Uber"
  ];

  const getJobUrl = (role, company, location) => {
    const query = `${encodeURIComponent(role)} at ${encodeURIComponent(company)}`;
    return `https://www.google.com/search?q=${query}&ibp=htl;jobs`;
  };

  // Pick random companies
  const randomCompany = () => companies[Math.floor(Math.random() * companies.length)];
  
  // Generate varied job offers with some randomness so it feels "alive"
  return [
    {
      jobTitle: role || "Full Stack Developer",
      company: randomCompany(),
      location: location || "Remote",
      salary: "$140k - $180k",
      jobUrl: getJobUrl(role || "Full Stack Developer", "Google", location), // Keep Google for the first one as a reliable fallback
      description: `We are looking for an experienced ${role} to join our core engineering team. 
      Responsibilities include building scalable web applications and optimizing performance.
      Requirements: 5+ years experience, Strong algorithms knowledge.`,
    },
    {
      jobTitle: `Senior ${role || "Developer"}`,
      company: randomCompany(),
      location: "San Francisco / Remote",
      salary: "$160k - $210k",
      jobUrl: getJobUrl(`Senior ${role || "Developer"}`, "Stripe", location),
      description: `Join our financial infrastructure team. 
      We need a ${role} who cares about developer experience.
      Stack: Ruby, React, and AWS.`,
    },
    {
      jobTitle: `Lead ${role || "Engineer"}`,
      company: randomCompany(),
      location: "Remote",
      salary: "$200k - $300k",
      jobUrl: getJobUrl(`Lead ${role || "Engineer"}`, "Netflix", location),
      description: `Help us build the future of entertainment. 
      Looking for a ${role} with high-scale system design experience.
      Culture: Freedom and Responsibility.`,
    },
  ].map(job => ({
    ...job,
    // Fix the URL to match the randomized company
    jobUrl: getJobUrl(job.jobTitle, job.company, job.location)
  }));
}

// --- Action 1: Save User Preferences ---
export async function saveJobPreferences(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  await db.user.update({
    where: { id: user.id },
    data: {
      jobPreferences: data, // { role, location, salary, type }
    },
  });

  return { success: true };
}

// --- Action 2: The "Agent" Logic (Find & Match) ---
export async function runJobAgent() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      id: true,
      jobPreferences: true,
      skills: true,
      experience: true,
    },
  });

  if (!user || !user.jobPreferences) {
    throw new Error("Please set your job preferences first.");
  }

  const prefs = user.jobPreferences;
  
  // 1. Fetch potential jobs (Scout)
  const rawJobs = await fetchJobsFromAPI(prefs);

  const results = [];

  // 2. Analyze each job (Filter & Match)
  for (const job of rawJobs) {
    // Check if job already exists to avoid duplicates
    const existing = await db.jobMatch.findFirst({
        where: {
            userId: user.id,
            jobTitle: job.jobTitle,
            company: job.company,
        }
    });

    if (existing) continue;

    const analysisPrompt = `
      You are a Career Agent. Analyze this job against the user's profile.
      
      User Profile:
      - Skills: ${user.skills?.join(", ")}
      - Experience: ${user.experience || 0} years
      - Preferences: Role=${prefs.role}, Location=${prefs.location}, Salary=${prefs.salary}

      Job Description:
      - Title: ${job.jobTitle}
      - Company: ${job.company}
      - Location: ${job.location}
      - Salary: ${job.salary}
      - Description: ${job.description}

      Task:
      1. Calculate a Match Score (0-100) based on skills and experience fit.
      2. Identify missing skills.
      3. List why this is a good match (or not).

      Return JSON:
      {
        "matchScore": number,
        "missingSkills": ["string"],
        "whyMatched": "string (concise reason)"
      }
    `;

    try {
        const aiResponse = await generateWithGemini(analysisPrompt);
        
        let analysis;
        try {
            const cleaned = aiResponse.replace(/```json/g, "").replace(/```/g, "").trim();
            const start = cleaned.indexOf("{");
            const end = cleaned.lastIndexOf("}") + 1;
            analysis = JSON.parse(cleaned.slice(start, end));
        } catch (e) {
            analysis = { matchScore: 50, missingSkills: [], whyMatched: "Analysis parsing failed." };
        }

        // 3. Save to DB
        const savedJob = await db.jobMatch.create({
            data: {
                userId: user.id,
                jobTitle: job.jobTitle,
                company: job.company,
                location: job.location,
                salary: job.salary,
                jobUrl: job.jobUrl,
                description: job.description,
                matchScore: analysis.matchScore,
                analysis: analysis,
                status: "NEW",
            }
        });

        results.push(savedJob);

    } catch (error) {
        console.error("Agent failed on job:", job.jobTitle, error);
    }
  }

  return results;
}

// --- Action 3: Get Matches ---
export async function getJobMatches() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
  
    if (!user) throw new Error("User not found");
  
    return await db.jobMatch.findMany({
        where: { userId: user.id },
        orderBy: {  matchScore: 'desc' } // Best matches first
    });
}
