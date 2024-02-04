import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { type Space } from "~/server/db/schema";

export const SpaceCard = ({ space }: { space: Space }) => {
  const { id, name, updatedAt } = space;
  // nice human readable relative time using
  const updatedAtRelative = formatDistanceToNow(
    new Date(updatedAt ?? Date.now()),
    {
      addSuffix: true,
    },
  );

  return (
    <Link
      href={`/space/${id}`}
      className="flex h-48 w-full flex-col rounded-md border border-border px-6
      py-4 shadow-sm transition-shadow hover:cursor-pointer hover:shadow-md"
    >
      <div className="flex h-full flex-col">
        <div className="mt-auto flex items-center justify-between">
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-sm text-foreground/70">{updatedAtRelative}</div>
        </div>
      </div>
    </Link>
  );
};
