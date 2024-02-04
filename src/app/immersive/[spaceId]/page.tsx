import { XRCanvas } from "~/app/immersive/_components/immersive/canvas";
import "~/styles/globals.css";
import { api } from "~/trpc/server";

export default async function ImmersiveViewLoader({
  params,
}: {
  params: { spaceId: string };
}) {
  const space = await api.space.getOne.query({ id: params.spaceId });
  const walls = await api.space.getWalls.query({ spaceId: params.spaceId });
  const assets = await api.space.getAssets.query({ spaceId: params.spaceId });

  return (
    <main className="h-screen w-screen">
      <XRCanvas space={space} walls={walls} assets={assets} />
    </main>
  );
}
