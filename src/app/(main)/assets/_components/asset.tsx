import Image from "next/image";
import { Skeleton } from "~/app/_components/ui/skeleton";

type ImageObject = {
  url: string;
  name: string;
  description: string;
};

type AssetProps = {
  image: ImageObject;
  setFocusedElement: (element: ImageObject) => void;
};

export const Asset = ({ image, setFocusedElement }: AssetProps) => {
  return (
    <div
      className="relative aspect-square w-full overflow-hidden transition-transform hover:cursor-pointer"
      onClick={() => setFocusedElement(image)}
    >
      {image.url ? (
        <Image
          className="object-cover"
          src={image.url}
          alt={image.name}
          layout="fill"
          style={{ background: "rgb(238,238,238)" }}
        />
      ) : (
        <Skeleton className="h-full w-full" />
      )}
    </div>
  );
};
