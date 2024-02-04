import Image from "next/image";
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
        isFocused && "outline outline-2 outline-foreground/20",
      )}
      onClick={() => setFocusedElement(asset)}
    >
      {asset?.imageUrl ? (
        <Image
          className={cn("rounded-sm bg-primary/10 object-cover")}
          src={asset.imageUrl}
          alt={asset.title ?? "Asset"}
          layout="fill"
        />
      ) : (
        <Skeleton className="h-full w-full" />
      )}
    </div>
  );
};
