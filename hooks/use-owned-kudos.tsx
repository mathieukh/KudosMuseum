import { BigNumber, Contract, ethers } from "ethers";
import { useState, useEffect } from "react";
import { forkJoin, from, map, Observable, of, switchMap } from "rxjs";
import { useWallet } from "use-wallet";
import {
  GNOSIS_KUDO_CONTRACT_ADDRESS,
  KUDO_CONTRACT_ABI,
  GnosisChain,
} from "../config/kudos.config";

const contract = new ethers.Contract(
  GNOSIS_KUDO_CONTRACT_ADDRESS,
  KUDO_CONTRACT_ABI,
  GnosisChain
);

const fetchTokenIdFromIndex = (
  contract: Contract,
  { ownedBy, index }: { ownedBy: string; index: number }
): Observable<string> =>
  from(contract.tokenOfOwnerByIndex(ownedBy, index) as Promise<BigNumber>).pipe(
    map((bigNumber) => bigNumber.toString())
  );

export const useOwnedKudos = () => {
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const wallet = useWallet();
  const { account } = wallet;
  useEffect(() => {
    if (account === null) {
      setTokenIds([]);
      return;
    }
    from(contract.balanceOf(account) as Promise<BigNumber>)
      .pipe(
        map((balanceOf) => [...Array(balanceOf.toNumber()).keys()]),
        switchMap((indexes) =>
          forkJoin(
            indexes.map((index) =>
              fetchTokenIdFromIndex(contract, {
                ownedBy: account,
                index,
              })
            )
          )
        )
      )
      .subscribe((tokenIds) => setTokenIds(tokenIds));
  }, [account]);
  return tokenIds;
};
