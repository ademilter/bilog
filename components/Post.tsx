import React from "react";
import Link from "next/link";
import { markdownToHtml } from "lib/editor";
import { DateTime } from "luxon";

export type Props = PostProps & {
  hideAuthor: boolean;
};

const Post: React.FC<Props> = (props) => {
  const {
    title,
    user,
    slug,
    likes,
    content,
    createdAt,
    hideAuthor = false,
  } = props;

  return (
    <div className="py-6">
      <header>
        <h3 className="text-2xl font-bold leading-none">
          <Link href={slug}>
            <a>{title}</a>
          </Link>
        </h3>
      </header>

      <div
        className="mt-2 line-clamp-2"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(content || "") }}
      />

      <footer className="mt-4 flex items-center space-x-2 text-sm text-gray-400">
        {hideAuthor ? null : (
          <>
            <img
              className="block w-6 h-6 rounded-full"
              src={user.picture}
              alt={user.name}
            />
            <Link href={`/${user.username}`}>
              <a>{user.name}</a>
            </Link>
            <span>·</span>
          </>
        )}

        <span>{DateTime.fromISO(createdAt.toString()).toRelative()}</span>
        {likes && likes.length > 0 && (
          <>
            <span>·</span>
            <span>{likes.length} like</span>
          </>
        )}
      </footer>
    </div>
  );
};

export type PostProps = {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  likes?: [];
  tags?: [];
  user: {
    id: string;
    username: string;
    name: string;
    picture: string;
  };
};

export const selectPost = {
  id: true,
  title: true,
  content: true,
  slug: true,
  published: true,
  publishedAt: true,
  createdAt: true,
  tags: {
    select: {
      id: true,
      name: true,
    },
  },
  likes: {
    select: {
      id: true,
    },
  },
  user: {
    select: {
      id: true,
      username: true,
      name: true,
      picture: true,
    },
  },
};

export default Post;
