import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cx from "classnames";
import Container from "./Container";
import GlobalContext from "context/global";

const Header: React.FC = () => {
  const router = useRouter();
  const { session } = React.useContext(GlobalContext);

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  if (!session) {
    return (
      <header className="bg-gray-100 py-4">
        <Container>
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-2">
              <a href="/api/auth/login">Login</a>
            </nav>
          </div>
        </Container>
      </header>
    );
  }

  return (
    <header className="bg-gray-100 py-4">
      <Container>
        <div className="flex items-center justify-between">
          <nav className="flex items-center space-x-4">
            <Link href="/">
              <a className={cx("", isActive("/") ? "text-gray-400" : "")}>
                Feed
              </a>
            </Link>
            <Link href="/drafts">
              <a className={cx("", isActive("/drafts") ? "text-gray-400" : "")}>
                Drafts
              </a>
            </Link>
          </nav>

          <div className="flex items-center">
            <details className="relative flex">
              <summary className="inline-flex">
                <img
                  className="block w-8 h-8 rounded-full"
                  src={session.picture}
                  alt={session.name}
                />
              </summary>

              <div
                className="z-50 absolute left-0 top-full p-2 bg-white shadow whitespace-nowrap
              flex flex-col gap-2"
              >
                <Link href="/new">
                  <a>New post</a>
                </Link>
                <Link href={`/${session.nickname}`}>
                  <a>Profile</a>
                </Link>
                <a href="/api/auth/logout">Log out</a>
              </div>
            </details>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
