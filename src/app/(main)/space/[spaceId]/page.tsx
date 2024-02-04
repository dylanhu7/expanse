import SpacePage from "~/app/(main)/space/[spaceId]/space-page";
import { api } from "~/trpc/server";

const SpacePageLoader = async ({ params }: { params: { spaceId: string } }) => {
  const space = await api.space.getOne.query({ id: params.spaceId });
  const walls = await api.space.getWalls.query({ spaceId: params.spaceId });
  const assets = await api.space.getAssets.query({ spaceId: params.spaceId });
  return <SpacePage space={space} />;
};

export default SpacePageLoader;
