import { XRCanvas } from "~/app/immersive/_components/immersive/canvas";
import "~/styles/globals.css";
import { api } from "~/trpc/server";

export default async function Home({
  params,
}: {
  params: { spaceId: string };
}) {
  const spaces = await api.space.getAll.query();

  return (
    <main className="h-screen w-screen">
      <XRCanvas data={`Hi! There are ${spaces.length} spaces.`} />
    </main>
  );
}
