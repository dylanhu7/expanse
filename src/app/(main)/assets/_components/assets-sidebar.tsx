"use client";

import { Input } from "~/app/(main)/_components/ui/input";
import { Textarea } from "~/app/(main)/_components/ui/textarea";

type ImageObject = {
  url: string;
  name: string;
  description: string;
};

type SidebarProps = {
  focusedElement: ImageObject | null;
};

export const AssetsSidebar = ({ focusedElement }: SidebarProps) => {
  return (
    <aside className="flex h-full w-full flex-shrink-0 basis-96 flex-col gap-2 overflow-hidden px-1">
      {focusedElement ? (
        <>
          <h2 className="text-xl font-semibold">Details</h2>
          <p className="text-sm text-foreground/50">
            Edit the details of the selected asset.
          </p>
          <Input
            value={focusedElement.name}
            placeholder="Put the name of the asset here..."
            onChange={(e) => console.log(e.target.value)}
          />
          <Textarea
            value={focusedElement.description}
            placeholder="Put the description of the asset here..."
            onChange={(e) => console.log(e.target.value)}
          />
        </>
      ) : (
        <div className="flex h-full items-center justify-center text-foreground/50">
          Select an asset to see its details.
        </div>
      )}
    </aside>
  );
};
