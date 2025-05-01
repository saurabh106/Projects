"use client";

import React, { useState ,useEffect} from "react";
import Topic from "./_components/Topic";
import VideoStyle from "./_components/VideoStyle";
import Voice from "./_components/Voice";
import Captions from "./_components/Captions";

const CreateNewVideo = () => {
  const [formData, setFormData] = useState({});

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  // Log the updated formData after the state has been updated
  useEffect(() => {
    // This effect runs every time formData is updated
    console.log('Updated formData:', formData); 
  }, [formData]); 

  return (
    <div>
      <h2 className="text-3xl ">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
        <div className="col-span-2 p-7 border rounded-xl h-[72vh] overflow-auto">
          {/* Topic & Script */}
          <Topic onHandleInputChange={onHandleInputChange} />

          {/* Vidoe Image Style */}
<VideoStyle  onHandleInputChange={onHandleInputChange} />
          {/* Voice */}
<Voice onHandleInputChange={onHandleInputChange}/> 
          {/* Captions */}
          <Captions onHandleInputChange={onHandleInputChange}/>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
