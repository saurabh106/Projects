import React from "react";
import StatsCards from "./_components/stats-cards";
import { getAssessments } from "@/actions/interview";
import PerformanceChart from "./_components/performance-chart";
import QuizList from "./_components/quiz-list";

const InterviewPage = async () => {
  const assessments = await getAssessments();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <header className="mb-10">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600
           via-purple-500 to-pink-500 animate-gradient-shift"
          >
            Interview Preparation
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Track your progress and practice for upcoming interviews
          </p>
        </header>

        <section className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <StatsCards assessments={assessments} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            {/* <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              Performance Overview
            </h2> */}
            <PerformanceChart assessments={assessments} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              Your Assessments
            </h2>
            <QuizList assessments={assessments} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default InterviewPage;
