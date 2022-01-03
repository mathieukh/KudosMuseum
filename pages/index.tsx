import { FC } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import PageLayout from "../components/PageLayout";
import PageName from "../components/PageName";

const TitleAndDescription: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="text-4xl text-center text-gray-800">{title}</p>
      <p className="max-w-2xl text-xl text-justify text-gray-600">{children}</p>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Kudos Museum</title>
        <meta name="description" content="KudosMuseum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div className="container mx-auto h-full flex flex-col justify-center items-center gap-10">
          <PageName title="KudosMuseum" />
          <TitleAndDescription title="What are Kudos ?">
            According to{" "}
            <a className="hover:text-gray-900" href="https://gitcoin.co/kudos">
              Gitcoin
            </a>
            ,{" "}
            <span className="italic">
              Kudos is a way of showing your appreciation for another Gitcoin
              member. It&apos;s also a way to showcase special skills that a
              member might have, such as Pythonista, or Design Star. Kudos
              tokens can be bought and sold on the Kudos Marketplace.
            </span>
          </TitleAndDescription>
          <TitleAndDescription title="And what is this ?">
            I wanted to visualize my owned Kudos in a showcase style. As I am a
            newby to the blockchain world, I thought this project would be a
            cool first step. I would have to deal with several different
            concepts to accomplish the wanted result.
            <br />
            For now, the application only works with a Browser Extension/dApp
            Browser and on the Gnosis chain
          </TitleAndDescription>
          <ul className="list-disc max-w-2xl text-xl text-justify text-gray-600">
            <li>Understand the concept of NFT which are Kudos</li>
            <li>Parse the NFT</li>
            <li>
              Display the Kudo in a cool way (Because yes, it is as well a{" "}
              <a
                className="hover:text-gray-900"
                href="https://tailwindcss.com/"
              >
                Tailwind
              </a>{" "}
              POC)
            </li>
            <li>
              Integrate a wallet connection to display the Kudos owned by the
              user
            </li>
          </ul>
        </div>
      </PageLayout>
    </div>
  );
};

export default Home;
