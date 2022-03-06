import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Link from "next/link";
import GlobalContext from "context/global";
import { markdownToHtml } from "lib/editor";
import prisma from "lib/prisma";
import { deepCopy, getPostIdFromSlug } from "lib/helper";
import Layout from "components/Layout";
import { PostProps, selectPost } from "components/Post";
import Button from "components/Button";

// Examples
// https://lux.camera/halide-2-7-its-a-keeper/

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;
  const id = getPostIdFromSlug(slug as string);

  const post = await prisma.post.findUnique({
    where: { id },
    select: selectPost,
  });

  if (!post) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: { post: deepCopy(post) },
  };
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const { session } = React.useContext(GlobalContext);

  const { id, title, content, published, user } = post;

  const isItMine = session?.nickname === user.username;

  async function publishPost(id: string) {
    await fetch(`/api/publish/${id}`, {
      method: "PUT",
    });
    return Router.push("/");
  }

  async function deletePost(id: string) {
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
    return Router.push("/");
  }

  return (
    <Layout>
      <div className="mt-4 space-x-2">
        {isItMine && (
          <>
            {published ? (
              <Button
                className="!bg-blue-100 text-blue-700"
                onClick={() => Router.push("/edit/[id]", `/edit/${id}`)}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  className="!bg-blue-100 text-blue-700"
                  onClick={() => publishPost(id)}
                >
                  Publish
                </Button>
                <Button
                  className="!bg-blue-100 text-blue-700"
                  onClick={() => Router.push("/draft/[id]", `/draft/${id}`)}
                >
                  Edit
                </Button>
              </>
            )}
            <Button
              className="!bg-red-100 text-red-700"
              onClick={() => deletePost(id)}
            >
              Delete
            </Button>
          </>
        )}
      </div>

      <div className="mt-10 prose prose-zinc max-w-none">
        {!published && <div>(Draft)</div>}

        <div className="mb-4">
          <Link href={`/${user.username}`}>
            <a>{user.name}</a>
          </Link>
        </div>

        <div className="text-5xl leading-none font-bold">{title}</div>

        <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
      </div>
    </Layout>
  );
};

export default Post;
