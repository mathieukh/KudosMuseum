import { FC } from "react";

const GreyButton: FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, ...props }) => (
  <button
    className="m-auto px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-600 text-white grid grid-cols-[repeat(2,max-content)] gap-2"
    {...props}
  >
    {children}
  </button>
);

export default GreyButton;
