import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const MockInterviewPage = () => {
  return (
    <div>
      <div>
        <Link href={"/interview"}>
          <Button varient="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MockInterviewPage;
