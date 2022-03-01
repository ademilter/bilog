import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "./Container";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <>
    <Header />

    <Container>
      <main className="py-10">{props.children}</main>
    </Container>

    <Footer />
  </>
);

export default Layout;
