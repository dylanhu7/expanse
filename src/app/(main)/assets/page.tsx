"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Sidebar } from "./_components/sidebar";
import { Asset } from "./_components/asset";
import { AddAsset } from "./_components/add-asset";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

type ImageObject = {
  url: string;
  name: string;
  description: string;
};

const AssetsPage = () => {
  const [focusedElement, setFocusedElement] = useState({} as ImageObject);

  const images = [
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
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
      name: "Autumn Forest",
      description: "A peaceful forest trail covered in fallen autumn leaves.",
    },
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
      name: "Desert Dunes",
      description: "The sun setting over the golden dunes of a vast desert.",
    },
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
      name: "Ocean Horizon",
      description: "The endless ocean horizon under a clear blue sky.",
    },
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
      name: "Snowy Peaks",
      description:
        "Majestic snow-capped mountain peaks under a crisp winter sky.",
    },
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
      name: "Urban Sunset",
      description:
        "A stunning sunset view from a high-rise in the heart of the city.",
    },
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
      name: "Tropical Paradise",
      description:
        "A serene beach with crystal-clear waters on a tropical island.",
    },
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
      name: "Ancient Ruins",
      description:
        "The mysterious ruins of an ancient civilization, overgrown with vegetation.",
    },
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
      name: "Tropical Paradise",
      description:
        "A serene beach with crystal-clear waters on a tropical island.",
    },
    {
      url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
      name: "Tropical Paradise",
      description:
        "A serene beach with crystal-clear waters on a tropical island.",
    },
  ];

  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex h-full flex-row items-stretch overflow-hidden"
    >
      <input {...getInputProps()} />
      <ScrollArea className="w-2/3 overflow-auto px-8 py-8">
        <div className="grid grid-cols-6 gap-4">
          {images.map((image, index) => (
            <Asset
              key={index}
              image={{
                url: image.url,
                name: image.name,
                description: image.description,
              }}
              setFocusedElement={setFocusedElement}
            />
          ))}
          <AddAsset />
        </div>
      </ScrollArea>

      <Sidebar focusedElement={focusedElement} />
    </div>
  );
};
export default AssetsPage;
