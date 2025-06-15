import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Quiz from "../_components/quiz";

const MockInterviewPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-4 md:px-6 py-8">
      <div className="flex flex-col space-y-6">
        <div className="mb-6">
          <Link href={"/interview"}>
            <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Back to Interview Preparation
              </span>
            </Button>
          </Link>
        </div>

        <div className="mb-10 space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 animate-gradient-shift">
            Mock Interview
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Test your knowledge with industry-specific questions and get ready for your next interview
          </p>
        </div>

        <div className="bg-background rounded-xl border p-6 shadow-sm">
          <Quiz />
        </div>
      </div>
    </div>
  );
};

export default MockInterviewPage;