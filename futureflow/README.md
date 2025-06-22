# 🌐 Futureflow

Futureflow is an AI-powered career development platform designed to help professionals advance their careers through intelligent tools and industry-specific insights. It combines automation, personalization, and real-time market analysis to deliver an all-in-one career toolkit.

# ✨ Features

• AI Resume Builder
Generate tailored resumes that align with your industry and experience level.

• Cover Letter Generator
Create compelling, customized cover letters with just a few inputs.

• Interview Preparation System
Practice mock interviews and receive personalized feedback based on AI analysis.

• Industry Insights
Stay informed with weekly updates on market trends, salary benchmarks, and in-demand skills.

• Progress Tracking
Monitor your interview prep progress over time with performance analytics and improvement suggestions.

• Editable Content
Customize all AI-generated content using a built-in markdown editor.

# 🔐 Data Privacy & Security
All user data is encrypted and securely stored.
Authentication is managed using Clerk.
No personal data is shared with third parties.


# 🚀 Getting Started

Clone the repository:

1. git clone https://github.com/your-username/futureflow.git
    cd futureflow

2. Install dependencies:

npm install
# or
yarn install

3. Run the development server:

npm run dev
# or
yarn dev

Open http://localhost:3000 to view it in the browser.


# ✅ Technologies Used :
React / Next.js,
Clerk (Authentication),
Markdown Editor,
CSS Modules / TailwindCSS (depending on your stack)

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