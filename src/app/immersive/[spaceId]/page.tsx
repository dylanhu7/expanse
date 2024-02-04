import { XRCanvas } from "~/app/immersive/_components/immersive/canvas";
import { api } from "~/trpc/server";

export default async function Home({
  params,
}: {
  params: { spaceId: string };
}) {
  const hello = await api.space.hello.query({ text: "from tRPC" });

  return <XRCanvas data={hello.greeting} />;
}
