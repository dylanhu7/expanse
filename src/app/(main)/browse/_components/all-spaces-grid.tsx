import { AllSpacesCard } from "./all-spaces-card";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";

export const AllSpacesGrid = async () => {
  const spaces = await api.space.getAll.query();
  const session = await getServerAuthSession();
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {spaces.map((space) => (
        <AllSpacesCard
          key={space.id}
          space={space}
          isOwner={session?.user.id === space.ownerId}
        />
      ))}
    </div>
  );
};
