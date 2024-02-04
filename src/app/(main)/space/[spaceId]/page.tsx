import { api } from "~/trpc/server";

const SpacePage = async ({ params }: { params: { spaceId: string } }) => {
  const space = await api.space.getOne.query({ id: params.spaceId });
  return (
    <div>
      <h1>Space {space.id}</h1>
    </div>
  );
};

export default SpacePage;
