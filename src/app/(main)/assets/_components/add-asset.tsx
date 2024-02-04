import { PlusIcon } from "@radix-ui/react-icons";

type AddAssetProps = {
  onClick: () => void;
};

export const AddAsset = ({ onClick }: AddAssetProps) => {
  return (
    <div
      className="relative aspect-square w-full overflow-hidden transition-transform hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 hover:bg-opacity-75">
        <PlusIcon className="h-8 w-8 text-white" />
      </div>
    </div>
  );
};
