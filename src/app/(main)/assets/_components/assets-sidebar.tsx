"use client";

import { Input } from "~/app/_components/ui/input";
import { Textarea } from "~/app/_components/ui/textarea";

type ImageObject = {
  url: string;
  name: string;
  description: string;
};

type SidebarProps = {
  focusedElement: ImageObject;
};

export const AssetsSidebar = ({ focusedElement }: SidebarProps) => {
  return (
    <aside className="flex h-full w-full flex-shrink-0 basis-96 flex-col gap-2 overflow-hidden">
      <h2 className="text-xl font-semibold">Details</h2>
      <p className="text-sm text-gray-500">
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
    </aside>
  );
};
