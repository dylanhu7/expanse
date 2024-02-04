import { type Space } from "~/server/db/schema";

export const SpaceSidebar = ({ space }: { space: Space }) => {
  return (
    <aside className="flex h-full w-full flex-shrink-0 basis-96 flex-col gap-3 overflow-hidden p-1">
      <h3 className="text-sm font-semibold">Space</h3>
      <h1 className="text-2xl font-semibold">{space.name}</h1>
      <div></div>
    </aside>
  );
};
