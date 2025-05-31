"use client"

import { toast } from "sonner";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetError,
} from "next-cloudinary";
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";
import {
  PlaceholderStyle,
  PlaceholderValue,
} from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureUrl: result?.info?.secure_url,
    }));
    onValueChange(result?.info?.public_id);

    toast.success("Image Uploaded Successfully", {
      description: "1 credit was deducted from your account",
      duration: 5000,
      className: "success-toast",
    });
  };

  const onUploadErrorHandler = () => {
    toast.error("Something went wrong while uploading", {
      description: "Please try again",
      duration: 5000,
      // className: 'error-toast' // Only if you've configured custom classes
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="multimorph"
      options={{
        multiple: false,
        resourceType: "image",
        sources: ["local", "camera"],
        maxFiles: 1,
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">Original</h3>

          {publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="image"
                  sizes={"(max-width:767px) 100vw,50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
                />
              </div>
            </>
          ) : (
            <div
              className="group flex h-48 w-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-[16px] border-2 border-dashed border-purple-300 bg-purple-100/20 shadow-inner transition-all hover:bg-purple-100/40 sm:h-56 sm:w-56"
              onClick={() => open()}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-[12px] bg-white p-3 shadow-sm shadow-purple-200/50 transition-transform group-hover:scale-105">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={20}
                  height={20}
                  className="mx-auto"
                />
              </div>

              <p className="text-center text-sm font-medium text-purple-800 sm:text-base">
                Click to upload Image
              </p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
