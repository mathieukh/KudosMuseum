import { useNft } from "use-nft";
import { GNOSIS_KUDO_CONTRACT_ADDRESS } from "../config/kudos.config";

export const useKudo = (tokenId: string) => {
  const nftResult = useNft(GNOSIS_KUDO_CONTRACT_ADDRESS, tokenId);
  if (nftResult.status === "error" || nftResult.status === "loading") {
    return nftResult;
  }
  const { nft } = nftResult;
  const attributes = nft.rawData!["attributes"] as Array<{
    trait_type: string;
    value: string;
  }>;
  const creator = attributes.find(
    (attr) => attr.trait_type === "artist"
  )!.value;
  return { ...nftResult, creator };
};
