import Link from "next/link";
import { type Space } from "~/server/db/schema";

export const AllSpacesCard = ({
  space,
  isOwner,
}: {
  space: Space;
  isOwner: boolean;
}) => {
  return (
    <>
      {isOwner ? (
        <Link
          href={`/space/${space.id}`}
          className="flex h-48 w-full flex-col rounded-md border border-border px-4 py-2
      shadow-sm transition-shadow hover:cursor-pointer hover:shadow-md"
        >
          {space.name}
        </Link>
      ) : (
        <Link
          href={`/immersive/${space.id}`}
          className="flex h-48 w-full flex-col rounded-md border border-border bg-foreground/10 px-4
      py-2 shadow-sm transition-shadow hover:cursor-pointer hover:shadow-md"
        >
          {space.name}
        </Link>
      )}
    </>
  );
};
