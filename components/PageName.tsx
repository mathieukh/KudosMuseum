import { FC } from "react";
import Image from "next/image";

const PageName: FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col justify-center gap-4">
    <h1 className="text-6xl text-center text-gray-800">{title}</h1>
    <Image
      src="/Linearicons_diamond.svg"
      alt="diamond"
      width="60"
      height="60"
    />
  </div>
);

export default PageName;
