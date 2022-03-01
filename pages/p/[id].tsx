import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import Button from "../../components/Button";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session } = useSession();

  const { id, title, content, published, author } = props;

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === author?.email;

  return (
    <Layout>
      <main className="max-w-4xl m-auto">
        <h1 className="text-2xl font-bold">
          {title} {published && <span>{title} (Draft)</span>}
        </h1>

        <p>By {author?.name}</p>

        <ReactMarkdown children={content} />

        <div className="mt-4 space-x-2">
          {!published && userHasValidSession && postBelongsToUser && (
            <Button onClick={() => publishPost(id)}>Publish</Button>
          )}

          {userHasValidSession && postBelongsToUser && (
            <Button onClick={() => deletePost(id)}>Delete</Button>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Post;
