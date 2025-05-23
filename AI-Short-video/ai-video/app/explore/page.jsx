"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "../_components/Footer";
import { Loader } from "lucide-react"; 

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.1,
      ease: "easeOut",
    },
  }),
};

const imageOptions = [
  "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function explore() {
  const [imageIndexes, setImageIndexes] = useState(
    Array(3)
      .fill(0)
      .map(() => Math.floor(Math.random() * imageOptions.length))
  );

  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    setLoading(true);

    // Simulate some async operation (e.g., compiling/generating)
    setTimeout(() => {
      setLoading(false);
      // You can do more stuff here like navigation or showing a message
    }, 5000); // 3 seconds simulation
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prev) =>
        prev.map(() => Math.floor(Math.random() * imageOptions.length))
      );
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 mt-19">
      <div className="flex gap-4 flex flex-col justify-center pr-360">
      <Link href="/">
          <Button
        onClick={handleClick}
            className="bg-white-600 color-black hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded cursor-pointer flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Loading...
              </>
            ) : (
              "Back to Dashboard"
            )}
          </Button>
        </Link>
        
      </div>

      <div className="flex flex-wrap gap-10 justify-center">
        {[0].map((i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="w-[800px] h-[150px] overflow-hidden relative">
              <CardContent className="p-6 w-full h-full flex items-center justify-center">
                <p className="text-lg text-center text-white-800">
                  An AI-powered short video generator that transforms scripts
                  into engaging videos by creating a sequence of AI-generated
                  images and stitching them into a dynamic visual story.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-10 justify-center">
        {[0, 1, 2].map((_, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap gap-10 justify-center">
            {imageIndexes.map((imageIdx, i) => (
              <motion.div
                key={i + rowIndex * 3}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <Card className="w-[400px] h-[450px] overflow-hidden relative">
                  <CardContent className="p-0 w-full h-full">
                    <Image
                      src={imageOptions[imageIdx]}
                      alt="Dynamic Image"
                      fill
                      style={{ objectFit: "cover" }}
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-10 justify-center">
        {[0, 1, 2].map((_, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap gap-10 justify-center">
            {imageIndexes.map((imageIdx, i) => (
              <motion.div
                key={i + rowIndex * 3}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <Card className="w-[400px] h-[450px] overflow-hidden relative">
                  <CardContent className="p-0 w-full h-full">
                    <Image
                      src={imageOptions[imageIdx]}
                      alt="Dynamic Image"
                      fill
                      style={{ objectFit: "cover" }}
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-10 justify-center">
        {[0, 1, 2].map((_, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap gap-10 justify-center">
            {imageIndexes.map((imageIdx, i) => (
              <motion.div
                key={i + rowIndex * 3}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <Card className="w-[400px] h-[450px] overflow-hidden relative">
                  <CardContent className="p-0 w-full h-full">
                    <Image
                      src={imageOptions[imageIdx]}
                      alt="Dynamic Image"
                      fill
                      style={{ objectFit: "cover" }}
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default explore;
