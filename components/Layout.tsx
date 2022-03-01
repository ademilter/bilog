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
      <div className="py-10">{props.children}</div>
    </Container>

    <Footer />
  </>
);

export default Layout;
