"use client";

import { Share2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import { useDebouncedCallbackAsync } from "~/lib/hooks/useDebouncedCallback";
import { cn } from "~/lib/utils";
import { type Space } from "~/server/db/schema";
import { api } from "~/trpc/react";

export const SpaceSidebar = ({ space }: { space: Space }) => {
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
      <div className="space-between flex items-start">
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="flex-1 text-sm font-medium">Space</h3>
          <h1
            className={cn(
              "text-2xl font-semibold",
              !title && "text-muted-foreground",
            )}
          >
            {title || "Untitled space"}
          </h1>
        </div>

        <Button
          className="flex h-10 w-10 items-center justify-center rounded-full p-2"
          variant="ghost"
          onClick={updateName}
        >
          <Share2Icon className="text-muted-foreground h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label>Title</Label>
          <Input
            placeholder="Add a title..."
            value={title}
            onChange={async (e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Label>Assets</Label>
          <ScrollArea className="border-border flex-1 rounded-md border">
            <div className="grid grid-cols-3 gap-2 p-2">
              {data?.map(
                (asset) =>
                  asset.imageUrl && (
                    <div key={asset.id} className="relative">
                      <Image
                        className="bg-primary/10 rounded-sm"
                        src={asset.imageUrl}
                        alt={asset.title ?? "Asset"}
                        fill
                      />
                    </div>
                  ),
              )}
            </div>
          </ScrollArea>
        </div>
        <Button asChild className="h-16">
          <Link
            href={`/immersive/${space.id}`}
            target="_blank"
            className="flex items-center justify-center"
          >
            <p className="mr-2 text-lg font-bold">🚀 Lift off!</p>
            {/* <ArrowRightIcon /> */}
          </Link>
        </Button>
      </div>
    </aside>
  );
};
