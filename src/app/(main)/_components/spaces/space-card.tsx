import Link from "next/link";
import { type Space } from "~/server/db/schema";

export const SpaceCard = ({ space }: { space: Space }) => {
  return (
    <Link
      href={`/space/${space.id}`}
      className="border-border flex h-48 w-full flex-col rounded-md border px-4 py-2
      shadow-sm transition-shadow hover:cursor-pointer hover:shadow-md"
    >
      {space.name}
    </Link>
  );
};
