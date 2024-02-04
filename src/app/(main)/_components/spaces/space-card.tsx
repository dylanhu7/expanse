import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { type Space } from "~/server/db/schema";

export const SpaceCard = ({
  space,
  isOwner,
}: {
  space: Space;
  isOwner: boolean;
}) => {
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
      className={cn(
        "flex h-48 w-full flex-col rounded-md border border-border px-6 py-4 shadow-sm transition-shadow hover:cursor-pointer hover:shadow-md",
        isOwner ? "" : "bg-accent/60",
      )}
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
