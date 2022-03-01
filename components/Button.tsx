import React from "react";
import cx from "classnames";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  className?: string;
  size?: "normal" | "small";
};

const Button: React.FC<Props> = ({
  children,
  className,
  size = "normal",
  ...props
}) => {
  return (
    <button
      type="button"
      className={cx(
        "bg-gray-200 p-2 rounded-md select-none h-10",
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
