import { api } from "~/trpc/server";
import AssetsPage from "./assets-page";

const AssetsPageLoader = async () => {
  const assets = await api.asset.getMine.query();
  return <AssetsPage assets={assets} />;
};

export default AssetsPageLoader;
