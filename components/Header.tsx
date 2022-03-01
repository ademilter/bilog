import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cx from "classnames";
import { signIn, signOut } from "next-auth/react";
import Container from "./Container";
import GlobalStoreContext from "store/global";

const Header: React.FC = () => {
  const router = useRouter();
  const { session } = React.useContext(GlobalStoreContext);

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  if (!session) {
    return (
      <header className="bg-gray-100 py-4">
        <Container>
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-2">
              <button onClick={() => signIn()}>Login</button>
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
                {session.user.image && (
                  <img
                    className="block w-8 h-8 rounded-full"
                    src={session.user.image}
                    alt={session.user.name}
                  />
                )}
              </summary>

              <div
                className="z-50 absolute left-0 top-full p-2 bg-white shadow whitespace-nowrap
              flex flex-col gap-2"
              >
                <Link href="/new">
                  <a>New post</a>
                </Link>
                <button onClick={() => signOut()}>Log out</button>
              </div>
            </details>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
