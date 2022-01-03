import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  { name: "Home", href: "/" },
  { name: "My Kudos", href: "/my-kudos" },
];

const Header = () => {
  const { asPath } = useRouter();
  return (
    <nav className="flex justify-center py-6 px-8 gap-6">
      {navigation.map((item) => (
        <Link key={item.name} href={item.href}>
          <a
            className={`font-medium ${
              asPath === item.href ? "text-gray-900" : "text-gray-500"
            } hover:text-gray-900`}
          >
            {item.name}
          </a>
        </Link>
      ))}
    </nav>
  );
};

const PageLayout: FC = ({ children }) => (
  <div className="grid grid-rows-[min-content_1fr] h-screen">
    <Header />
    <div className="h-full w-full">{children}</div>
  </div>
);

export default PageLayout;
