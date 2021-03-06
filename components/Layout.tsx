import React, { ReactNode } from "react";
import Header from "./Header";
// import Footer from "./Footer";
import Container from "./Container";

type Props = {
  children: ReactNode;
  header?: ReactNode;
};

const Layout: React.FC<Props> = ({ children, header }) => (
  <>
    {header ? header : <Header />}

    <Container>{children}</Container>

    {/*<Footer />*/}
  </>
);

export default Layout;
