import type { NextPage } from "next";
import Head from "next/head";
import KudosShowcase, {
  Kudo,
  KudosShowcaseProps,
} from "../components/KudosShowcase";
import PageLayout from "../components/PageLayout";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { LogoutIcon, UserIcon } from "@heroicons/react/outline";
import { useWallet } from "use-wallet";
import { useOwnedKudos } from "../hooks/use-owned-kudos";
import GreyButton from "../components/GreyButton";

const supportedConnectors = [
  { id: "injected", name: "MetaMask" },
  { id: "walletconnect", name: "WalletConnect" },
] as const;

const ConnectWalletLayout: FC = () => {
  const wallet = useWallet();
  return (
    <main className="flex h-full">
      <div className="m-auto flex flex-col items-center gap-2">
        {supportedConnectors.map(({ id, name }) => (
          <GreyButton key={id} onClick={() => wallet.connect(id)}>
            <UserIcon className="h-5 w-5" />
            Connect via {name}
          </GreyButton>
        ))}
      </div>
    </main>
  );
};

const MyKudosShowcase: FC<KudosShowcaseProps> = (props) => {
  const ownedTokenIds = useOwnedKudos();
  return (
    <KudosShowcase {...props}>
      {ownedTokenIds.map((tokenId) => (
        <Kudo key={tokenId} tokenId={tokenId} />
      ))}
    </KudosShowcase>
  );
};

const DisconnectFooter: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  const wallet = useWallet();
  return (
    <div {...props}>
      <div className="flex h-full">
        {!wallet.isConnected() ? null : (
          <GreyButton onClick={() => wallet.reset()}>
            <LogoutIcon className="h-5 w-5" />
            Disconnect
          </GreyButton>
        )}
      </div>
    </div>
  );
};

const MyKudos: NextPage = () => {
  const { isConnected } = useWallet();
  return (
    <div>
      <Head>
        <title>Kudos Museum - My Kudos</title>
        <meta name="description" content="KudosMuseum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        {!isConnected() ? (
          <ConnectWalletLayout />
        ) : (
          <>
            <MyKudosShowcase className="pb-12" />
            <DisconnectFooter className="fixed h-12 w-full bottom-0" />
          </>
        )}
      </PageLayout>
    </div>
  );
};

export default MyKudos;
