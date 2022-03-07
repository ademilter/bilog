import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Link from "next/link";
import { DateTime } from "luxon";
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

  console.log(post);

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
      <div className="mt-4 flex items-center space-x-2">
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
                <div>Draft</div>
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

      <main className="py-10">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <img
              className="w-10 rounded-full"
              src={user.picture}
              alt={user.name}
            />
            <div>
              <Link href={`/${user.username}`}>
                <a className="font-medium">{user.name}</a>
              </Link>
              <div className="text-sm text-gray-500">
                {DateTime.fromISO(post.publishedAt).toFormat("DDD")}
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-zinc max-w-none">
          <div className="text-5xl leading-none font-bold">{title}</div>
          <div
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content || "") }}
          />
        </div>
      </main>
    </Layout>
  );
};

export default Post;
