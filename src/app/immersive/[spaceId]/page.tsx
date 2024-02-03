import { api } from "~/trpc/server";
import { XRCanvas } from "../../_components/immersive/canvas";

export default async function Home({
  params,
}: {
  params: { spaceId: string };
}) {
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return <XRCanvas data={hello.greeting} />;
}
