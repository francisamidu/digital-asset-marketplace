import React, { MouseEventHandler } from "react";
import { VscArrowRight as ArrowRight } from "react-icons/vsc";

type ButtonProps = {
  text: string;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  right?: boolean;
  className?: string;
};

const Button = ({
  text,
  onClick,
  right = false,
  className,
  type = "button",
}: ButtonProps) => {
  const handleClick = typeof onClick === "function" ? onClick : () => {};

  return (
    <button
      className={`cursor-pointer h-12 px-8 py-2 mt-4 rounded-lg text-inter text-white flex flex-row items-center justify-center transition duration-500 outline-none bg-[#4552A8] hover:bg-[#3f4b99] ${className}`}
      onClick={handleClick}
      type={type}
    >
      {text}
      {right && <ArrowRight className="text-1xl text-white ml-2" />}
    </button>
  );
};

export default Button;
