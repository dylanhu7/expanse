"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";

export const NewSpaceButton = () => {
  const createSpace = api.space.create.useMutation();
  return (
    <Button
      onClick={async () => {
        console.log("createSpace", createSpace);
        const space = await createSpace.mutateAsync({
          name: "Untitled space",
          spawnX: 0,
          spawnY: 0,
        });
      }}
    >
      <PlusIcon className="mr-2 h-4 w-4" />
      New Space
    </Button>
  );
};
