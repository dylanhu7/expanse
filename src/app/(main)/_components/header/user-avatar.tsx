import { PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { Button } from "~/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { getServerAuthSession } from "~/server/auth";

export const UserAvatar = async () => {
  const session = await getServerAuthSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {session ? (
              <>
                <AvatarImage
                  src={session.user.image!}
                  alt={session.user.name!}
                />
                <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
              </>
            ) : (
              <AvatarFallback>
                <PersonIcon />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {session ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Portfolio</DropdownMenuItem>
              <DropdownMenuItem>Assets</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Link href="/api/auth/signout">
              <DropdownMenuItem className="text-destructive">
                Log out
              </DropdownMenuItem>
            </Link>
          </>
        ) : (
          <>
            <Link href="/api/auth/signin">
              <DropdownMenuItem>Sign in</DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
