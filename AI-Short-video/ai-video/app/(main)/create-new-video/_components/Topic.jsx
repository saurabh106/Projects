"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SparklesIcon } from "lucide-react";
import axios from "axios";

const suggestions = [
  "Historic Story",
  "Kids Story",
  "Movie Stories",
  "AI Innovations",
  "Space Mysteries",
  "Horror Stories",
  "Mythological Tales",
  "Tech Breakthroughs",
  "True Crime Stories",
  "Fantasy Adventures",
  "Science Experiements",
  "Motivational Stories",
];

const Topic = ({ onHandleInputChange }) => {
  const [selectTopic, setSelectedTopic] = useState({});
  const [loading, setLoading] = useState(false);

  const loadingButton = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const handleButtonClick = () => {
    loadingButton(); // Call the first function (e.g., set loading state)
    GenerateScript(); // Call the second function (e.g., script generation)
  };

  const  GenerateScript =async () => {

    const result = await axios.post('/api/generate-script',{
      topic:selectTopic
    });
    console.log(result.data)
      
  }

  return (
    <div>
      <h2 className="mb-2">Project Title</h2>
      <Input
        placeholder="Enter project title"
        onChange={(e) => onHandleInputChange("title", e.target.value)}
      />
      <div className="mt-5">
        <h2>Video Topic</h2>
        <p className="text-sm text-gray-600">Select topic for your video</p>

        <Tabs defaultValue="suggestion" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="suggestion">Suggestion</TabsTrigger>
            <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
          </TabsList>
          <TabsContent value="suggestion">
            <div>
              {suggestions.map((suggestion, index) => (
                <Button
                  variant="outline"
                  key={index}
                  className={`m-1 ${suggestion == selectTopic && "bg-secondary"}`}
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    onHandleInputChange("topic", suggestion); // Update formData directly
                    console.log("Selected Topic:", suggestion); // Log selected topic
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="your_topic">
            <div>
              <h2>Enter your own Topic</h2>
              <Textarea
                placeholder="Enter your topic "
                onChange={(event) =>
                  onHandleInputChange("topic", event.target.value)
                }
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Button
        className="mt-3"
        size="sm"
        onClick={handleButtonClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="animate-spin mr-2">⏳</span> Loading...
          </>
        ) : (
          <>
            <SparklesIcon className="mr-2" /> Generate Script
          </>
        )}
      </Button>
    </div>
  );
};

export default Topic;
