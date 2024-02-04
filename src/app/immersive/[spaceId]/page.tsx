import { api } from "~/trpc/server";
import { XRCanvas } from "../../(main)/_components/immersive/canvas";

export default async function Home({
  params,
}: {
  params: { spaceId: string };
}) {
  const hello = await api.space.hello.query({ text: "from tRPC" });

  return <XRCanvas data={hello.greeting} />;
}
