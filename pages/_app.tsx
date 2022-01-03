import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NftProvider } from "use-nft";
import { UseWalletProvider } from "use-wallet";
import {
  GNOSIS_CHAIN_ID,
  GNOSIS_RPC_URL,
  GnosisChain,
} from "../config/kudos.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UseWalletProvider
      //@ts-ignore chainId is required
      chainId={GNOSIS_CHAIN_ID}
      connectors={{
        injected: {
          package: null,
        },
        walletconnect: {
          rpc: {
            [GNOSIS_CHAIN_ID]: GNOSIS_RPC_URL,
          },
        },
      }}
    >
      <NftProvider fetcher={["ethers", { provider: GnosisChain }]}>
        <Component {...pageProps} />
      </NftProvider>
    </UseWalletProvider>
  );
}

export default MyApp;
