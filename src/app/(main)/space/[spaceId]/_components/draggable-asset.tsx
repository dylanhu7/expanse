import Image from "next/image";
import type { Asset } from "~/server/db/schema";

type DraggableAssetProps = {
  asset: Asset;
  onClick: (asset: Asset) => void;
};

export const DraggableAsset = (props: DraggableAssetProps) => {
  return (
    <div
      className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-sm"
      onClick={() => props.onClick(props.asset)}
    >
      <Image
        src={props.asset.imageUrl ?? ""}
        alt={props.asset.title ?? "Asset"}
        fill
        objectFit="contain"
      />
    </div>
  );
};
