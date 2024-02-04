import Image from "next/image";
import type { Asset } from "~/server/db/schema";

type DraggableAssetProps = {
  asset: Asset;
};

const DraggableAsset = (props: DraggableAssetProps) => {
  return (
    <div className="h-full w-full">
      <Image
        src={props.asset.imageUrl ?? ""}
        alt={props.asset.title ?? "Asset"}
        fill
      />
    </div>
  );
};
