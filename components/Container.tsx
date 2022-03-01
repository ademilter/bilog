import React from "react";
import cx from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className, ...props }: Props) => {
  return (
    <div className={cx("max-w-3xl m-auto", className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
