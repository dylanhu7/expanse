import { SpaceCard } from "~/app/(main)/_components/spaces/space-card";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export const AllSpacesGrid = async () => {
  const spaces = await api.space.getAll.query();
  const session = await getServerAuthSession();
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {spaces.map((space) => (
        <SpaceCard
          key={space.id}
          space={space}
          isOwner={session?.user.id === space.ownerId}
        />
      ))}
    </div>
  );
};
