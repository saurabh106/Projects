"use client";

import React, { useState, useEffect } from "react";
import Topic from "./_components/Topic";
import VideoStyle from "./_components/VideoStyle";
import Voice from "./_components/Voice";
import Captions from "./_components/Captions";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import Preview from "./_components/Preview";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useAuthContext } from "@/app/provider";

const CreateNewVideo = () => {
  const [formData, setFormData] = useState({});
  const CreateIntialVideoRecord = useMutation(api.videoData.CreateVideoData);
  const { user } = useAuthContext();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const GenerateVideo = async () => {
    if (
      !formData?.topic ||
      !formData?.script ||
      !formData.videoStyle ||
      !formData?.caption ||
      !formData?.voice
    ) {
      console.log("Error", "Enter All Fields");
      return;
    }

    //Save Video Data First
    const resp = await CreateIntialVideoRecord({
      title: formData.title,
      topic: formData.topic,
      script: formData.script,
      videoStyle: formData.videoStyle,
      caption: formData.caption,
      voice: formData.voice,
      uid: user?._id,
      createdBy: user?.email,
    });
    console.log(resp);

    // const result = await axios.post("api/generate-video-data", {
    // ...formData,
    // });
    // console.log(result);
  };

  // Log the updated formData after the state has been updated
  useEffect(() => {
    // This effect runs every time formData is updated
    console.log("Updated formData:", formData);
  }, [formData]);

  return (
    <div>
      <h2 className="text-3xl ">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-7">
        <div className="col-span-2 p-7 border rounded-xl h-[72vh] overflow-auto">
          {/* Topic & Script */}
          <Topic onHandleInputChange={onHandleInputChange} />

          {/* Vidoe Image Style */}
          <VideoStyle onHandleInputChange={onHandleInputChange} />
          {/* Voice */}
          <Voice onHandleInputChange={onHandleInputChange} />
          {/* Captions */}
          <Captions onHandleInputChange={onHandleInputChange} />

          <Button className="w-full mt-5" onClick={GenerateVideo}>
            <WandSparkles />
            Generate Video
          </Button>
        </div>
        <div>
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
