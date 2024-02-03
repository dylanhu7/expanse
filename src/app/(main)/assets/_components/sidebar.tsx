"use client";

import { Input } from "~/app/_components/ui/input";
import { Textarea } from "~/app/_components/ui/textarea";

const itemStyle =
  "flex flex-col overflow-auto flex-auto data-[state=closed]:flex-none w-full";
const triggerStyle = "pt-0 pb-1 font-semibold hover:no-underline select-none";
const contentStyle =
  "flex-auto overflow-auto data-[state=closed]:animate-none data-[state=open]:animate-none";

type ImageObject = {
  url: string;
  name: string;
  description: string;
};

type SidebarProps = {
  focusedElement: ImageObject;
};

export const Sidebar = ({ focusedElement }: SidebarProps) => {
  return (
    <aside className="flex h-full w-full flex-shrink-0 basis-1/3 flex-col gap-2 overflow-hidden bg-background py-8 pb-10 pl-2 pr-10">
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
