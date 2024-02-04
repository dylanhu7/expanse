import SpacePage from "~/app/(main)/space/[spaceId]/space-page";
import { api } from "~/trpc/server";

const SpacePageLoader = async ({ params }: { params: { spaceId: string } }) => {
  const space = await api.space.getOne.query({ id: params.spaceId });
  return <SpacePage space={space} />;
};

export default SpacePageLoader;
