import React from "react";
import cx from "classnames";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  className?: string;
  size?: "normal" | "small";
};

const Button = ({ children, className, size = "normal", ...props }: Props) => {
  return (
    <button
      type="button"
      className={cx(
        "bg-gray-300 p-2 rounded-md select-none h-10",
        size === "small" ? "text-base py-1 h-8" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
