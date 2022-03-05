import React from "react";
import Link from "next/link";
import { markdownToHtml } from "lib/editor";
import { DateTime } from "luxon";

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

const Post: React.FC<PostProps> = (props) => {
  const { id, title, user, slug, likes, content, createdAt } = props;

  return (
    <div>
      <Link href={slug}>
        <a className="block py-6">
          <header>
            <h3 className="text-3xl font-bold leading-none">{title}</h3>
          </header>

          <div
            className="mt-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
          />

          <footer className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
            <img
              className="block w-6 h-6 rounded-full"
              src={user.picture}
              alt={user.name}
            />
            <span>{user.name}</span>
            <span>·</span>
            <span>{DateTime.fromISO(createdAt.toString()).toRelative()}</span>
            {likes && likes.length > 0 && (
              <>
                <span>·</span>
                <span>{likes.length} like</span>
              </>
            )}
          </footer>
        </a>
      </Link>
    </div>
  );
};

export default Post;
