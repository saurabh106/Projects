# 🌐 Futureflow

**Futureflow** is an advanced AI-powered career ecosystem designed to transform how professionals navigate their career journey. Unlike standard resume builders, Futureflow acts as a proactive **AI Career Agent**, helping users not just prepare for jobs but actively find, analyze, and apply to them. It combines automated job scouting, intelligent skill analysis, and professional networking tools into a single, cohesive platform.

Data-driven, interactive, and autonomous — Futureflow is your personal career co-pilot.

# ✨ Key Features

### 🤖 AI Career Agent (New!)
*   **Auto-Scout:** Describe your dream role, and the agent autonomously finds relevant opportunities using real-time search.
*   **Match Analysis:** Uses Gemini AI to analyze job descriptions against your profile, giving you a **Match Score (0-100%)** and highlighting missing skills.
*   **Smart Apply:** Provides direct links to valid Google Job searches for immediate application.

### 🕸️ Interactive Networking Graph (New!)
*   **Visual Network:** A dynamic, force-directed scatter plot that visualizes your professional connections.
*   **Gamified Growth:** Log interactions (coffee chats, emails) to watch "Cold" contacts turn "Warm" and move up your relationship graph.
*   **Stay in Touch:** Track your networking momentum and never lose touch with a mentor again.

### 🎯 Skill Gap Analyzer (New!)
*   **Personalized Roadmap:** Enter a target role (e.g., "Senior React Dev"), and the AI analyzes your current stack to generate a step-by-step learning plan.
*   **Resource Recommendations:** Get curated lists of courses, articles, and projects to bridge your skill gaps.

### 📂 Secure Document Vault (New!)
*   **Career Storage:** A secure, cloud-based vault to store and organize multiple versions of Resumes, Cover Letters, and Certificates.
*   **Instant Access:** Upload, preview, and download your essential career assets from anywhere.

### 📝 Core Essentials
*   **AI Resume Builder:** Drag-and-drop builder with real-time feedback and Markdown-to-PDF generation.
*   **Cover Letter Generator:** Create tailored cover letters in seconds.
*   **Interview Prep:** AI-generated mock interviews with instant result analysis.
*   **Industry Insights:** Real-time data on salary trends and market demand.

# 🔐 Data Privacy & Security
*   **User Data:** All personal data is encrypted and securely stored in PostgreSQL.
*   **Authentication:** Managed via Clerk for enterprise-grade security.
*   **AI Privacy:** Anonymized data processing for AI features; no personal data is used to train public models.

# 🚀 Getting Started

Clone the repository:

1. `git clone https://github.com/your-username/futureflow.git`
   `cd futureflow`

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# ✅ Technologies Used
*   **Frontend:** Next.js 14, React, TailwindCSS, Lucide Icons, ShadCN UI
*   **Backend:** Next.js Server Actions, Prisma ORM
*   **Database:** PostgreSQL (via Neon/Supabase)
*   **AI Engine:** Google Gemini (Generative AI)
*   **Auth:** Clerk
*   **Visualization:** Recharts (Data Viz), html2pdf.js (PDF Generation)

# 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

# 🙋 FAQ
Check out the /data/faqs.js file for a structured list of commonly asked questions, which can be dynamically rendered in your UI.


# .env file 

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

DATABASE_URL=


GEMINI_API_KEY=