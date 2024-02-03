import { UserAvatar } from "~/app/_components/header/user-avatar";

export const Header = () => {
  return (
    <header className="bg-background sticky top-0 flex flex-shrink-0 basis-16 items-center justify-between border-b px-8">
      <h1 className="text-xl font-semibold">Expanse</h1>
      <UserAvatar />
    </header>
  );
};
