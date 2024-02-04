import { XRCanvas } from "~/app/immersive/_components/immersive/canvas";
import { api } from "~/trpc/server";

export default async function Home({
  params,
}: {
  params: { spaceId: string };
}) {
  const spaces = await api.space.getAll.query();

  return <XRCanvas data={`Hi! There are ${spaces.length} spaces.`} />;
}
