"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { Textarea } from "~/app/_components/ui/textarea";
import type { Asset } from "~/server/db/schema";
import { Button } from "../../../_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../_components/ui/dropdown-menu";

type SidebarProps = {
  focusedElement: Asset | null;
  onSave: (updatedAsset: Asset) => void;
};

export const AssetsSidebar = ({ focusedElement, onSave }: SidebarProps) => {
  const [editedObject, setEditedObject] = useState<Asset | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (focusedElement) {
      setEditedObject({ ...focusedElement });
      setIsChanged(false);
    }
  }, [focusedElement]);

  const handleSave = () => {
    if (editedObject) {
      onSave(editedObject);
      setIsChanged(false);
    }
  };

  const handleCancel = () => {
    if (focusedElement) {
      setEditedObject({ ...focusedElement });
      setIsChanged(false);
    }
  };

  const handleChange = (key: keyof Asset, value: string) => {
    if (editedObject) {
      setEditedObject({ ...editedObject, [key]: value });
      setIsChanged(true);
    }
  };

  return (
    <aside className="border-border flex h-full w-full flex-shrink-0 basis-96 flex-col gap-3 overflow-hidden border-l p-8">
      {editedObject ? (
        <div className="flex flex-1 flex-col gap-6">
          <div className="relative w-full basis-1/3">
            <Image
              src={editedObject.imageUrl ?? ""}
              alt={editedObject.title ?? "Asset"}
              fill
              objectFit="contain"
            />
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <Label>Title</Label>
              <Input
                value={editedObject.title ?? ""}
                placeholder="Add a title..."
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div className="flex basis-16 flex-col gap-2">
              <Label>Year</Label>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" className="w-full">
                    {editedObject.year ?? "Select..."}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom">
                  <ScrollArea className="max-h-60 overflow-auto">
                    {[...(Array(200) as number[])].map((_, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() =>
                          handleChange(
                            "year",
                            (2024 - index) as unknown as string,
                          )
                        }
                      >
                        {2024 - index}
                      </DropdownMenuItem>
                    ))}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              value={editedObject.description ?? ""}
              placeholder="Add a description..."
              className="h-full"
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <Button
              disabled={!isChanged}
              onClick={handleCancel}
              variant="secondary"
              className="w-full"
            >
              Cancel
            </Button>
            <Button
              disabled={!isChanged}
              onClick={handleSave}
              variant="default"
              className="w-full"
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-foreground/50 flex h-full items-center justify-center">
          Select an asset to see its details.
        </div>
      )}
    </aside>
  );
};
