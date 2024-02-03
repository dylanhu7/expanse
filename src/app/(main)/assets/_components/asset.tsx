import Image from "next/image";

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
      <Image
        className="object-cover"
        src={image.url}
        alt={image.name}
        layout="fill"
      />
    </div>
  );
};
