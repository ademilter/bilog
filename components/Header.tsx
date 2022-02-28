import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import type { SessionContextValue } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status }: SessionContextValue = useSession();

  if (!session) return null;

  return (
    <nav>
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}>My drafts</a>
        </Link>
      </div>

      <div className="right">
        <p>
          {session.user.image && (
            <img src={session.user.image} alt={session.user.name} width={40} />
          )}
          <span>{session.user.name}</span>
          <span>({session.user.email})</span>
        </p>
        <Link href="/create">
          <button>
            <a>New post</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </div>
    </nav>
  );
};

export default Header;
