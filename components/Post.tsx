import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<PostProps> = (post) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Link href={`/p/${post.id}`}>
      <a className="block border rounded p-4">
        <header>
          <h3 className="font-bold">{post.title}</h3>
        </header>

        <ReactMarkdown children={post.content} />

        <footer>
          <small>By {authorName}</small>
        </footer>
      </a>
    </Link>
  );
};

export default Post;
