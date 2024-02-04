import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

export default async function Home() {
  noStore();

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <Link href="/immersive/a">test</Link>
    </main>
  );
}
