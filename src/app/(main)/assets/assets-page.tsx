"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AddAsset } from "~/app/(main)/assets/_components/add-asset";
import { AssetView } from "~/app/(main)/assets/_components/asset-view";
import { AssetsSidebar } from "~/app/(main)/assets/_components/assets-sidebar";
import type { Asset } from "~/server/db/schema";
import { api } from "~/trpc/react";

type AssetsPageProps = {
  assets: Asset[];
};

const AssetsPage = ({ assets }: AssetsPageProps) => {
  const createAsset = api.asset.create.useMutation();
  const updateAsset = api.asset.update.useMutation();
  const inputRef = useRef(null as HTMLInputElement | null);
  const onAddAssetClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const [focusedElement, setFocusedElement] = useState(
    assets.length > 0 ? assets[0] : (null as unknown as Asset),
  );
  const [stateAssets, setStateAssets] = useState(assets);

  useEffect(() => {
    setStateAssets(assets);
  }, [assets]);

  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length == 0) return;
      const file = acceptedFiles[0];
      setStateAssets([...stateAssets, null as unknown as Asset]);
      void upload(file!.name, file as Blob, {
        access: "public",
        handleUploadUrl: "/api/upload",
      }).then((result: PutBlobResult) => {
        createAsset.mutate({
          title: file ? file.name : "",
          imageUrl: result.url,
        });
        setStateAssets(stateAssets.slice(0, stateAssets.length - 1));
        setStateAssets([
          ...stateAssets,
          { title: file ? file.name : "", imageUrl: result.url } as Asset,
        ]);
      });
    },
  });

  const updatePropertiesOfAsset = (updatedAsset: Asset) => {
    setStateAssets(
      stateAssets.map((image) =>
        image.id === updatedAsset.id ? updatedAsset : image,
      ),
    );
    updateAsset.mutate({
      id: updatedAsset.id,
      title: updatedAsset.title ?? undefined,
      description: updatedAsset.description ?? undefined,
      imageUrl: updatedAsset.imageUrl ?? undefined,
      year: updatedAsset.year ?? 2024,
    });
  };

  return (
    <div {...getRootProps()} className="flex h-full gap-4 overflow-hidden">
      <input {...getInputProps()} ref={inputRef} />
      <ScrollArea className="flex-1 overflow-auto py-7 pl-7">
        <div className="grid grid-cols-2 gap-4 p-1 md:grid-cols-3 lg:grid-cols-4">
          {stateAssets.map((asset, index) => (
            <AssetView
              key={index}
              asset={asset}
              setFocusedElement={setFocusedElement}
              focusedElement={focusedElement ?? null}
            />
          ))}
          <AddAsset onClick={onAddAssetClick} />
        </div>
      </ScrollArea>
      <AssetsSidebar
        focusedElement={focusedElement ?? null}
        onSave={updatePropertiesOfAsset}
      />
    </div>
  );
};

export default AssetsPage;
