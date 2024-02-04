"use client";

import { useEffect, useState } from "react";
import { Input } from "~/app/(main)/_components/ui/input";
import { Textarea } from "~/app/(main)/_components/ui/textarea";
import { Button } from "../../_components/ui/button";

type ImageObject = {
  url: string;
  name: string;
  description: string;
};

type SidebarProps = {
  focusedElement: ImageObject | null;
  onSave: (updatedImageObject: ImageObject) => void;
};

export const AssetsSidebar = ({ focusedElement, onSave }: SidebarProps) => {
  const [editedObject, setEditedObject] = useState<ImageObject | null>(null);
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

  const handleChange = (key: keyof ImageObject, value: string) => {
    if (editedObject) {
      setEditedObject({ ...editedObject, [key]: value });
      setIsChanged(true);
    }
  };

  return (
    <aside className="flex h-full w-full flex-shrink-0 basis-96 flex-col gap-3 overflow-hidden px-1">
      {editedObject ? (
        <>
          <h2 className="text-xl font-semibold">Details</h2>
          <p className="text-sm text-foreground/50">
            Edit the details of the selected asset.
          </p>
          <Input
            value={editedObject.name}
            placeholder="Put the name of the asset here..."
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Textarea
            value={editedObject.description}
            placeholder="Put the description of the asset here..."
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <div className="flex justify-end gap-3">
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
        </>
      ) : (
        <div className="flex h-full items-center justify-center text-foreground/50">
          Select an asset to see its details.
        </div>
      )}
    </aside>
  );
};
