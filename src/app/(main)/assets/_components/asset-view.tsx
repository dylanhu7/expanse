import Image from "next/image";
import { Button } from "~/app/_components/ui/button";
import { Skeleton } from "~/app/_components/ui/skeleton";
import { cn } from "~/lib/utils";
import type { Asset } from "~/server/db/schema";

type AssetViewProps = {
  asset: Asset;
  setFocusedElement: (element: Asset) => void;
  focusedElement: Asset | null;
};

export const AssetView = ({
  asset,
  setFocusedElement,
  focusedElement,
}: AssetViewProps) => {
  const isFocused = focusedElement && asset && focusedElement?.id === asset.id;

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-sm transition-transform hover:cursor-pointer",
        isFocused && "outline-foreground/20 outline outline-2",
      )}
      onClick={() => setFocusedElement(asset)}
    >
      {asset?.imageUrl ? (
        <div>
          <Button className="absolute right-2 top-2">X</Button>

          <Image
            className={cn("bg-primary/10 rounded-sm object-cover")}
            src={asset.imageUrl}
            alt={asset.title ?? "Asset"}
            fill
          />
        </div>
      ) : (
        <Skeleton className="h-full w-full" />
      )}
    </div>
  );
};
