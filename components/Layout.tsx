import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <>
    <Header />

    <div className="py-10">{props.children}</div>

    <Footer />
  </>
);

export default Layout;
