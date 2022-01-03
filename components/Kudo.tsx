import { FC } from "react";
import { useKudo } from "../hooks/use-kudo";

const KudoImage: FC<{ src: string; alt: string; paintor: string }> = ({
  src,
  alt,
  paintor,
}) => (
  <div className="relative border-8 border-gray-800 shadow-[0_10px_7px_-5px_rgba(0,0,0,0.3)] border-box">
    <span className="absolute bottom-0 right-1 italic text-sm">{paintor}</span>
    <div className="h-full w-full shadow-[0px_0px_20px_0px_rgba(0,0,0,0.5)_inset] p-9">
      <img src={src} alt={alt} />
    </div>
  </div>
);

const Spinner: FC = () => (
  <div className="flex items-center justify-center ">
    <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
  </div>
);

const ErrorDisplay: FC<{ error: Error; onRetryClick: () => void }> = ({
  error,
  onRetryClick,
}) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center gap-2"
    role="alert"
  >
    <strong className="font-bold flex-shrink">{error.name}</strong>
    <span className="flex-grow">{error.message}</span>
    <span className="flex-shrink">
      <button
        onClick={(event) => {
          event.preventDefault();
          onRetryClick();
        }}
        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded"
      >
        Retry
      </button>
    </span>
  </div>
);

const Kudo: FC<{ tokenId: string }> = ({ tokenId }) => {
  const nftResult = useKudo(tokenId);
  if (nftResult.status === "loading") {
    return <Spinner />;
  }
  if (nftResult.status === "error") {
    return (
      <ErrorDisplay
        error={nftResult.error}
        onRetryClick={() => nftResult.reload()}
      />
    );
  }
  const { creator, nft } = nftResult;
  return (
    <div className="w-full max-w-[300px] grid grid-rows-[1fr_min-content]">
      <KudoImage src={nft.image} alt={nft.name} paintor={creator} />
      <h2 className="text-xl text-gray-900 text-center mt-1">{nft.name}</h2>
    </div>
  );
};

export default Kudo;
