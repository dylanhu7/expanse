"use client";
// import { Tldraw } from "@tldraw/tldraw";
import { SpaceSidebar } from "~/app/(main)/space/[spaceId]/space-sidebar";
import { type Space } from "~/server/db/schema";

const SpacePage = ({ space }: { space: Space }) => {
  return (
    <div className="flex h-full gap-8 overflow-hidden px-8 py-8">
      <div className="bg-accent/50 flex-1 rounded-lg">{/* <Tldraw /> */}</div>
      <SpaceSidebar space={space} />
    </div>
  );
};

export default SpacePage;
