"use client";

import { Share2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import { useDebouncedCallbackAsync } from "~/lib/hooks/useDebouncedCallback";
import { cn } from "~/lib/utils";
import { Asset, type Space } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { DraggableAsset } from "./_components/draggable-asset";

export const SpaceSidebar = ({
  space,
  selectedLine,
  deselectLine,
  artSetMode,
  toggleArtSetMode,
  possibleAssets,
  addAssetToWall,
}: {
  space: Space;
  selectedLine: {
    start: { x: number; y: number };
    end: { x: number; y: number };
    direction: 1 | 2;
  };
  deselectLine: () => void;
  artSetMode: boolean;
  toggleArtSetMode: () => void;
  possibleAssets: Asset[];
  addAssetToWall: (asset: Asset) => void;
}) => {
  const [title, setTitle] = useState(
    space.name === null || space.name === "Untitled space" ? "" : space.name,
  );
  const updateName = useCallback(async () => {
    console.log("updateName", space.id);
  }, [space.id]);
  const updateNameDebounced = useDebouncedCallbackAsync(updateName, 2000);

  const { data } = api.asset.getMine.useQuery();

  return (
    <aside className="flex h-full w-full flex-shrink-0 basis-96 flex-col gap-8 overflow-hidden p-1">
      {selectedLine.start ? (
        artSetMode ? (
          <div className="flex h-full flex-col gap-4 p-2">
            <h3 className="text-2xl font-semibold text-muted-foreground">
              Assets
            </h3>
            <div className="grid grid-cols-2 gap-4 p-2">
              {possibleAssets.map((asset) => (
                <DraggableAsset
                  key={asset.id}
                  asset={asset}
                  onClick={addAssetToWall}
                />
              ))}
            </div>
            <Button
              className="flex items-center justify-center rounded-md p-4"
              variant="outline"
              onClick={toggleArtSetMode}
            >
              Done
            </Button>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between gap-2">
              <h3 className="text-2xl font-semibold text-muted-foreground">
                Selected wall
              </h3>
              <Button
                className="flex w-1/4 items-center justify-center rounded px-4"
                variant="outline"
              >
                {selectedLine.direction === 1 ? "Side A" : "Side B"}
              </Button>

              <Button
                className="flex items-center justify-center rounded px-4"
                variant="destructive"
                onClick={deselectLine}
              >
                Deselect
              </Button>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <Label>Assets</Label>
              <ScrollArea className="flex-1 rounded-md border border-border">
                <div className="grid grid-cols-3 gap-2 p-6">
                  {data?.map(
                    (asset, index) =>
                      asset.imageUrl && (
                        <div
                          className="relative aspect-square w-full overflow-hidden rounded-sm"
                          key={index}
                        >
                          <Image
                            src={asset.imageUrl}
                            alt={asset.title ?? "Asset"}
                            fill
                            objectFit="contain"
                          />
                        </div>
                      ),
                  )}
                </div>
              </ScrollArea>
              <Button
                className="flex items-center justify-center rounded-md p-4"
                variant="outline"
                onClick={toggleArtSetMode}
              >
                Place Art 🖼️
              </Button>
            </div>
          </div>
        )
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <div className="space-between flex items-center">
              <h3 className="flex-1  text-sm font-semibold">Space</h3>
              <Button
                className="flex h-10 w-10 items-center justify-center rounded-full p-2"
                variant="ghost"
                onClick={updateName}
              >
                <Share2Icon className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            <h1
              className={cn(
                "text-2xl font-semibold",
                !title && "text-muted-foreground",
              )}
            >
              {title || "Untitled space"}
            </h1>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                placeholder="Add a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Label>Assets</Label>
              <ScrollArea className="flex-1 rounded-md border border-border">
                <div className="grid grid-cols-3 gap-2 p-6">
                  {data?.map(
                    (asset, index) =>
                      asset.imageUrl && (
                        <div
                          className="relative aspect-square w-full overflow-hidden rounded-sm"
                          key={index}
                        >
                          <Image
                            src={asset.imageUrl}
                            alt={asset.title ?? "Asset"}
                            fill
                            objectFit="contain"
                          />
                        </div>
                      ),
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};
