import React, { FC } from "react";
import Kudo from "./Kudo";
export { default as Kudo } from "./Kudo";

const checkChildrenAreKudos = (children: React.ReactNode) =>
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child) || child.type !== Kudo) {
      throw new Error("`KudosShowcase` only accepts children of type `Kudo`.");
    }
  });

export type KudosShowcaseProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const KudosShowcase: FC<KudosShowcaseProps> = ({ children, ...props }) => {
  checkChildrenAreKudos(children);
  const { className, ...otherProps } = props;
  return (
    <div
      {...otherProps}
      className={`container px-10 sm:px-0 sm:mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4 items-start justify-items-center ${className}`}
    >
      {children}
    </div>
  );
};

export default KudosShowcase;
