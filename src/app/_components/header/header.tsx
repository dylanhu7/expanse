import { UserAvatar } from "~/app/_components/header/user-avatar";

export const Header = () => {
  return (
    <header className="sticky top-0 flex flex-shrink-0 basis-16 items-center justify-between bg-background px-8">
      <h1 className="text-xl">Expanse</h1>
      <UserAvatar />
    </header>
  );
};
