"use client";

import React, { useState, useEffect } from "react";
import Topic from "./_components/Topic";
import VideoStyle from "./_components/VideoStyle";
import Voice from "./_components/Voice";
import Captions from "./_components/Captions";
import { Button } from "@/components/ui/button";
import { WandSparkles, Loader2Icon } from "lucide-react";
import Preview from "./_components/Preview";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuthContext } from "@/app/provider";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateNewVideo = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const CreateInitialVideoRecord = useMutation(api.videoData.CreateVideoData);
  const { user } = useAuthContext(); // Ensure this provides _id and email
  const router = useRouter();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const GenerateVideo = async () => {
    // if(user?.credits <=0){
    //   toast('Please add more credits!')
    //   return;
    // }

    if (
      !formData?.title ||
      !formData?.topic ||
      !formData?.script ||
      !formData?.videoStyle ||
      !formData?.caption ||
      !formData?.voice
    ) {
      toast.error("Please select all the fields");
      return;
    }

    setLoading(true);

    try {
      const resp = await CreateInitialVideoRecord({
        title: formData.title,
        topic: formData.topic,
        script: formData.script,
        videoStyle: formData.videoStyle,
        caption: formData.caption,
        voice: formData.voice,
        uid: user?._id,
        createdBy: user?.email,
        credits: user?.credits,
      });

      const result = await axios.post("/api/generate-video-data", {
        ...formData,
        recordId: resp,
      });
      toast.success("Video generated successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("🚨 Error in GenerateVideo. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    toast("Please create only 5 videos because this is a free version.", {
      icon: "⚠️",
      duration: 6000,
    });
  }, []);

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
            {loading ? (
              <Loader2Icon className="animate-spin mr-2" />
            ) : (
              <WandSparkles className="mr-2" />
            )}
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
