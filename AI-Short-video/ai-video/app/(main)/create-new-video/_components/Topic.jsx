"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon, SparklesIcon, Loader } from "lucide-react";
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
  const [loading, setLoading] = useState(); // 'idle' | 'loading' | 'done'
  const [scripts, setScripts] = useState();
  const [selectedScriptIndex,setSelectedScriptIndex] = useState()

  const GenerateScript = async () => {
    setLoading(true);
    setSelectedScriptIndex(null)  
    try {
      const result = await axios.post("/api/generate-script", {
        topic: selectTopic,
      });
      console.log(result.data);
      setScripts(result?.data?.script);

    } catch (error) {
      console.log(error.message);
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
                  className={`m-1 ${suggestion === selectTopic ? "bg-secondary" : ""}`}
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    onHandleInputChange("topic", suggestion);
                    console.log("Selected Topic:", suggestion);
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

        {scripts?.length > 0 && 
        <div className="mt-3">
        <h2>Select the script</h2>
          <div className="grid grid-cols-2 gap-5 mt-1">
            {scripts?.map((item, index) => (
              <div key={index} className={`p-3 border rounded-lg cuersor-pointer
              ${selectedScriptIndex == index && 'border-white bg-secondary'}` }
              onClick={() => setSelectedScriptIndex(index)} >
                <h2 className="line-clamp-4 text-sm text-gray-300">{item.content}</h2>
              </div>
            ))}
          </div>
        
      </div>
        }
        </div>

      <div className="mt-3">
        <Button
          className="mt-3"
          size="sm"
          onClick={GenerateScript}
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" /> : <SparklesIcon />}
          Generate Script
        </Button>
      </div>
    </div>
  );
};

export default Topic;
