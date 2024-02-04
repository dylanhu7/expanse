import Image from "next/image";
import { Skeleton } from "~/app/_components/ui/skeleton";
import { cn } from "~/lib/utils";

type ImageObject = {
  url?: string;
  title?: string;
  description?: string;
  year?: number;
  uid?: string;
};

type AssetProps = {
  image: ImageObject;
  setFocusedElement: (element: ImageObject) => void;
  focusedElement: ImageObject | null;
};

export const Asset = ({
  image,
  setFocusedElement,
  focusedElement,
}: AssetProps) => {
  const isFocused = focusedElement?.uid === image.uid;

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-sm transition-transform hover:cursor-pointer",
        isFocused && "outline outline-2 outline-foreground/20",
      )}
      onClick={() => setFocusedElement(image)}
    >
      {image.url ? (
        <Image
          className={cn("rounded-sm bg-primary/10 object-cover")}
          src={image.url}
          alt={image.title ?? "Asset"}
          layout="fill"
        />
      ) : (
        <Skeleton className="h-full w-full" />
      )}
    </div>
  );
};
