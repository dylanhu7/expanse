import { SpaceCard } from "~/app/(main)/_components/spaces/space-card";
import { api } from "~/trpc/server";

export const SpacesGrid = async () => {
  const spaces = await api.space.getMine.query();
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {spaces.reverse().map((space) => (
        <SpaceCard key={space.id} space={space} />
      ))}
    </div>
  );
};
