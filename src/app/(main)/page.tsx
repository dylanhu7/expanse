import { NewSpaceButton } from "~/app/(main)/_components/spaces/new-space-button";
import { SpacesGrid } from "~/app/(main)/_components/spaces/spaces-grid";

export default async function Home() {
  return (
    <main className="flex h-full flex-col gap-8 px-8 py-4">
      <div className="flex items-center gap-4">
        <NewSpaceButton />
      </div>
      <SpacesGrid />
      {/* <Link href="/immersive/a">test</Link> */}
    </main>
  );
}
