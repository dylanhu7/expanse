"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AddAsset } from "~/app/(main)/assets/_components/add-asset";
import { Asset } from "~/app/(main)/assets/_components/asset";
import { AssetsSidebar } from "~/app/(main)/assets/_components/assets-sidebar";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";

type ImageObject = {
  url: string;
  name: string;
  description: string;
};

const AssetsPage = () => {
  const inputRef = useRef(null as HTMLInputElement | null);
  const onAddAssetClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const [focusedElement, setFocusedElement] = useState(
    null as ImageObject | null,
  );
  const [images, setImages] = useState<ImageObject[]>([
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      name: "Mountain Sunrise",
      description:
        "A breathtaking view of a sunrise over a serene mountain landscape.",
    },
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
      name: "City Lights",
      description:
        "The vibrant city lights shining bright against the night sky.",
    },
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
      name: "Mountain Sunrise",
      description:
        "A breathtaking view of a sunrise over a serene mountain landscape.",
    },
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
      name: "Mountain Sunrise",
      description:
        "A breathtaking view of a sunrise over a serene mountain landscape.",
    },
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
      name: "Mountain Sunrise",
      description:
        "A breathtaking view of a sunrise over a serene mountain landscape.",
    },
  ]);

  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length == 0) return;
      const file = acceptedFiles[0];
      // add temp to images
      setImages([
        ...images,
        {
          url: "",
          name: "loading...",
          description: "",
        },
      ]);
      void upload(file!.name, file as Blob, {
        access: "public",
        handleUploadUrl: "/api/upload",
      }).then((result: PutBlobResult) => {
        setImages(images.slice(0, images.length - 1));
        setImages([
          ...images,
          {
            url: result.url,
            name: file!.name,
            description: "",
          },
        ]);
      });
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex h-full gap-4 overflow-hidden px-8 py-8"
    >
      <input {...getInputProps()} ref={inputRef} />
      <ScrollArea className="flex-1 overflow-auto pr-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <Asset
              key={index}
              image={image}
              setFocusedElement={setFocusedElement}
            />
          ))}
          <AddAsset onClick={onAddAssetClick} />
        </div>
      </ScrollArea>
      <AssetsSidebar focusedElement={focusedElement} onSave={() => {}} />
    </div>
  );
};

export default AssetsPage;
