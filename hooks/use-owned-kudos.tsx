import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useWallet } from "use-wallet";
import {
  GNOSIS_KUDO_CONTRACT_ADDRESS,
  KUDO_CONTRACT_ABI,
  GnosisChain,
} from "../config/kudos.config";

export const useOwnedKudos = () => {
  const wallet = useWallet();
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  useEffect(() => {
    const contract = new ethers.Contract(
      GNOSIS_KUDO_CONTRACT_ADDRESS,
      KUDO_CONTRACT_ABI,
      GnosisChain
    );
    const fetchTokenIds = async () => {
      const balanceOf: ethers.BigNumber = await contract.balanceOf(
        wallet.account
      );
      const tokenIds = await Promise.all(
        [...Array(balanceOf.toNumber()).keys()].map((index) =>
          contract
            .tokenOfOwnerByIndex(wallet.account, index)
            .then((tokenId: ethers.BigNumber) => tokenId.toString())
        )
      );
      setTokenIds(tokenIds);
    };
    fetchTokenIds();
  }, [wallet.account]);
  return tokenIds;
};
