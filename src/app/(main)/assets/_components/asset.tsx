import Image from "next/image";

type AssetProps = {
  image: string;
  name: string;
  description: string;
};

export const Asset = ({ image, name, description }: AssetProps) => {
  return (
    <div className="relative aspect-square w-full overflow-hidden transition-transform hover:cursor-pointer">
      <Image className="object-cover" src={image} alt={name} layout="fill" />
    </div>
  );
};
