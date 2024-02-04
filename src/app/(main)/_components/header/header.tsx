import Link from "next/link";
import { UserAvatar } from "~/app/(main)/_components/header/user-avatar";

export const Header = () => {
  return (
    <header className="bg-background sticky top-0 flex flex-shrink-0 basis-16 items-center justify-between border-b px-8">
      <Link href="/">
        <h1 className="text-xl font-medium">Expanse</h1>
      </Link>
      <UserAvatar />
    </header>
  );
};
