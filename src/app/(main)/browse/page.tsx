import { NewSpaceButton } from "~/app/(main)/_components/spaces/new-space-button";
import { AllSpacesGrid } from "./_components/all-spaces-grid";

export default async function Home() {
  return (
    <main className="flex h-full flex-col gap-4 px-8 py-8">
      <div className="flex items-center gap-4">
        <NewSpaceButton />
      </div>
      <AllSpacesGrid />
    </main>
  );
}
