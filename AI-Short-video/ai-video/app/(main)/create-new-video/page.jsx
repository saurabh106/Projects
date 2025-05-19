"use client";

import React, { useState, useEffect } from "react";
import Topic from "./_components/Topic";
import VideoStyle from "./_components/VideoStyle";
import Voice from "./_components/Voice";
import Captions from "./_components/Captions";
import { Button } from "@/components/ui/button";
import { WandSparkles,Loader2Icon } from "lucide-react";
import Preview from "./_components/Preview";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuthContext } from "@/app/provider";

const CreateNewVideo = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const CreateInitialVideoRecord = useMutation(api.videoData.CreateVideoData);
const { user } = useAuthContext(); // Ensure this provides _id and email

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const GenerateVideo = async () => {
    console.log("GenerateVideo function started.");
  
    if (
      !formData?.title ||
      !formData?.topic ||
      !formData?.script ||
      !formData?.videoStyle ||
      !formData?.caption ||
      !formData?.voice
    ) {
      console.log("Error: Missing required fields in formData.");
      return;
    }
   setLoading(true);
  
      const resp = await CreateInitialVideoRecord( {
        title: formData.title,
        topic: formData.topic,
        script: formData.script,
        videoStyle: formData.videoStyle,
        caption: formData.caption,
        voice: formData.voice,
        uid: user?._id, // Ensure this is the Convex user ID (from auth)
        createdBy: user?.email,
      });
      console.log(resp)
  
    // const result = await axios.post('/api/generate-video-data',{
    //   ...formData
    // })
    // console.log(result)
  };
  
  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  return (
    <div>
      <h2 className="text-3xl">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-7">
        <div className="col-span-2 p-7 border rounded-xl h-[72vh] overflow-auto">
          <Topic onHandleInputChange={onHandleInputChange} />
          <VideoStyle onHandleInputChange={onHandleInputChange} />
          <Voice onHandleInputChange={onHandleInputChange} />
          <Captions onHandleInputChange={onHandleInputChange} />

          <Button
            className="w-full mt-5"
            onClick={GenerateVideo}
          disabled={loading}
          >
          {loading?<Loader2Icon className='animate-spin'/>:
            <WandSparkles />}
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
