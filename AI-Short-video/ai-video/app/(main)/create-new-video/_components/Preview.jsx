import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react"; 
import { options } from "./VideoStyle";

function Preview({ formData }) {
  const [selectedVideoStyle, setSelectedVideoStyle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Whenever formData changes, update the selected style and trigger loading
  useEffect(() => {
    if (formData?.videoStyle) {
      const style = options.find((item) => item?.name === formData?.videoStyle);
      if (style) {
        setIsLoading(true); // Start loading only when user selects a style
        setSelectedVideoStyle(style);
      }
    }
  }, [formData?.videoStyle]);

  return (
    <div className="relative w-full h-auto">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
          <Loader className="animate-spin text-gray-600 w-10 h-10" />
        </div>
      )}

      {selectedVideoStyle && (
        <Image
          src={selectedVideoStyle.image}
          alt={selectedVideoStyle.name}
          width={1000}
          height={300}
          onLoad={() => setIsLoading(false)}
          className="w-full h-[70vh] object-cover rounded-xl"
        />
      )}
      <h2 className={`${formData?.caption?.style} absolute bottom-8 text-center w-full`}>
        {" "}
        {formData?.caption?.name}
      </h2>
    </div>
  );
}

export default Preview;
