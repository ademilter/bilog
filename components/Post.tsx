import React from "react";
import Link from "next/link";
import { markdownToHtml } from "lib/editor";
import { DateTime } from "luxon";

export type PostProps = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  author: {
    email: string;
    name: string;
    image: string;
  };
};

const Post: React.FC<PostProps> = ({
  id,
  title,
  author,
  content,
  createdAt,
}) => {
  return (
    <div>
      <Link href={`/p/${id}`}>
        <a className="block py-6">
          <header>
            <h3 className="text-3xl font-bold leading-none">{title}</h3>
          </header>

          <div
            className="mt-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
          />

          <footer className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
            {author.image && (
              <img
                className="block w-6 h-6 rounded-full"
                src={author.image}
                alt={author.name}
              />
            )}
            <span>{author.name}</span>
            <span>·</span>
            <span>{DateTime.fromISO(createdAt.toString()).toRelative()}</span>
          </footer>
        </a>
      </Link>
    </div>
  );
};

export default Post;
