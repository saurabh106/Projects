"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SparklesIcon, Loader } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "@/app/provider";

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
  const [selectTopic, setSelectedTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [scripts, setScripts] = useState([]);
  const [selectedScriptIndex, setSelectedScriptIndex] = useState(null);
  const { user } = useAuthContext();

  const GenerateScript = async () => {

    // if(user?.credits <=0){
    //   toast('Please add more credits!')
    //   return;
    // }
  

    if (!selectTopic) {
      toast.error("Please select or enter a topic first.");
      return;
    }

    setLoading(true);
    setSelectedScriptIndex(null); // reset previous selection
    setScripts([]);

    toast.loading("Generating script...");

    try {
      const result = await axios.post("/api/generate-script", {
        topic: selectTopic,
      });

      const generatedScripts = result?.data?.script || [];

      setScripts(generatedScripts);

      toast.dismiss();
      toast.success("Script generated successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to generate script. Please try again.");

    }

    setLoading(false);
  };

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
                  className={`m-1 ${
                    suggestion === selectTopic ? "bg-secondary" : ""
                  }`}
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    onHandleInputChange("topic", suggestion);
                    toast.success(`Selected Topic: ${suggestion}`);
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
                placeholder="Enter your topic"
                onChange={(event) => {
                  setSelectedTopic(event.target.value);
                  onHandleInputChange("topic", event.target.value);
                }}
              />
            </div>
          </TabsContent>
        </Tabs>

        {scripts.length > 0 && (
          <div className="mt-4">
            <h2>Select a Script</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {scripts.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer ${
                    selectedScriptIndex === index
                      ? "border-white bg-secondary"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedScriptIndex(index);
                    onHandleInputChange("script", item.content); 
                  }}
                >
                  <p className="line-clamp-5 text-sm text-gray-300">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <Button
          className="mt-3"
          size="sm"
          onClick={GenerateScript}
          disabled={loading || !selectTopic}
        >
          {loading ? <Loader className="animate-spin" /> : <SparklesIcon />}
          Generate Script
        </Button>
      </div>
    </div>
  );
};

export default Topic;
