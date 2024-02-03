import Image from "next/image";

type AssetProps = {
  image: string;
  name: string;
  description: string;
};

export const Asset = ({ image, name, description }: AssetProps) => {
  return (
    <div className="relative aspect-square w-full overflow-hidden transition-transform hover:cursor-pointer">
      <Image
        src={image}
        alt={name}
        layout="fill"
        objectFit="cover"
        className="h-full w-full"
      />
    </div>
  );
};
