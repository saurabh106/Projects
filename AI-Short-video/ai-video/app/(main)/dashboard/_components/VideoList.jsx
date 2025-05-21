"use client";

import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);
  const convex = useConvex();
  const { user } = useAuthContext();

  useEffect(() => {
    user && GetUserVideoList();
  }, [user]);

  const GetUserVideoList = async () => {
    const result = await convex.query(api.videoData.GetUserVideos, {
      uid: user?._id,
    });
    setVideoList(result);
    console.log(result);
  };

  return (
    <div>
      {videoList?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-28 gap-5 p-5 border border-dashed rounded-xl py-16">
          <Image src="/logo.svg" alt="logo" width={60} height={60} />
          <h2 className="text-gray-400 text-lg">
            You don't have any video created. Create new one
          </h2>
          <Link href="/create-new-video">
            <Button>+ Create New Video</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10">
          {videoList.map((video, index) => (
            <div key={index}>
              {Array.isArray(video?.images) && video.images[0] && (
                <Image
                  src={video.images[0]}
                  alt={video?.title}
                  width={500}
                  height={500}
                  className="w-full object-cover rounded-xl aspect-[2/3]"
                />
              )}
              <div>
                <h2>{video?.title}</h2>
                <h2>{video?._creationTime}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
