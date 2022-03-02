import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";

import { markdownToHtml } from "lib/editor";
import prisma from "lib/prisma";
import GlobalStoreContext from "store/global";

import Layout from "components/Layout";
import { PostProps } from "components/Post";
import Button from "components/Button";
import { deepCopy } from "../../lib/helper";

// Examples
// https://lux.camera/halide-2-7-its-a-keeper/

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      author: {
        select: {
          email: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return {
    props: deepCopy(post),
  };
};

const Post: React.FC<PostProps> = (props) => {
  const { session } = React.useContext(GlobalStoreContext);

  const { id, title, content, published, author } = props;

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === author?.email;

  async function publishPost(id: number) {
    await fetch(`/api/publish/${id}`, {
      method: "PUT",
    });
    return Router.push("/");
  }

  async function deletePost(id: number) {
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
    return Router.push("/");
  }

  return (
    <Layout>
      <div className="mt-4 space-x-2">
        {!published && userHasValidSession && postBelongsToUser && (
          <>
            <Button
              className="!bg-blue-100 text-blue-700"
              onClick={() => Router.push("/draft/[id]", `/draft/${id}`)}
            >
              Edit
            </Button>
            <Button
              className="!bg-blue-100 text-blue-700"
              onClick={() => publishPost(id)}
            >
              Publish
            </Button>
          </>
        )}

        {userHasValidSession && postBelongsToUser && (
          <Button
            className="!bg-red-100 text-red-700"
            onClick={() => deletePost(id)}
          >
            Delete
          </Button>
        )}
      </div>

      <div className="mt-10 prose prose-zinc max-w-none">
        {!published && <div>(Draft)</div>}

        <p>{author.name}</p>

        <div className="text-5xl leading-none font-bold">{title}</div>

        <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
      </div>
    </Layout>
  );
};

export default Post;
