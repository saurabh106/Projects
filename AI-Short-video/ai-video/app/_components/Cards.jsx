"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

// Animation variant
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.10,
      ease: "easeOut",
    },
  }),
};

export function Cards() {
  return (
    <div className="flex flex-col items-center gap-10 mt-19">
      <div className="flex flex-wrap gap-10 justify-center">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="w-[400px] h-[450px] overflow-hidden relative">
              <CardContent className="p-0 w-full h-full">
                <Image
                  src={
                    i === 0
                      ? "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759"
                      : "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="Random"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-10 justify-center">
        {[2, 3].map((i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            {i === 2 ? (
              <Card className="w-[400px] h-[450px] overflow-hidden relative">
                <CardContent className="p-0 w-full h-full">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Random"
                    fill
                    style={{ objectFit: "cover" }}
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="w-full max-w-[700px] h-auto overflow-hidden relative">
  <CardContent className="p-6 w-full h-full flex items-center justify-center">
    <p className="text-base sm:text-lg text-center text-white-800">
      An AI-powered short video generator that transforms scripts into engaging
      videos by creating a sequence of AI-generated images and stitching them
      into a dynamic visual story.
    </p>
  </CardContent>
</Card>

            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
