import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { UserProfile } from "@auth0/nextjs-auth0";

import { markdownToHtml } from "lib/editor";
import prisma from "lib/prisma";
import { deepCopy } from "lib/helper";

import Layout from "components/Layout";
import { PostProps } from "components/Post";
import Button from "components/Button";

// Examples
// https://lux.camera/halide-2-7-its-a-keeper/

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;
  const id = slug.toString().split("-").at(-1);
  let post = null;
  let error = null;

  try {
    post = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        published: true,
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
      },
    });
  } catch (e) {
    error = e;
    console.error(e);
  }

  return {
    props: {
      post: deepCopy(post),
      error,
    },
  };
};

const Post: React.FC<{
  user: UserProfile;
  post: null | PostProps;
  error: unknown;
}> = ({ user: session, post, error }) => {
  console.log(session);
  console.log(post);
  console.log(error);

  // const { id, title, content, published, user } = post;
  //
  // const postBelongsToUser = session && session.nickname === user.username;
  //
  // async function publishPost(id: string) {
  //   await fetch(`/api/publish/${id}`, {
  //     method: "PUT",
  //   });
  //   return Router.push("/");
  // }
  //
  // async function deletePost(id: string) {
  //   await fetch(`/api/post/${id}`, {
  //     method: "DELETE",
  //   });
  //   return Router.push("/");
  // }

  return (
    <Layout>
      {/*<div className="mt-4 space-x-2">*/}
      {/*  {postBelongsToUser && (*/}
      {/*    <>*/}
      {/*      {published ? (*/}
      {/*        <Button*/}
      {/*          className="!bg-blue-100 text-blue-700"*/}
      {/*          onClick={() => Router.push("/edit/[id]", `/edit/${id}`)}*/}
      {/*        >*/}
      {/*          Edit*/}
      {/*        </Button>*/}
      {/*      ) : (*/}
      {/*        <>*/}
      {/*          <Button*/}
      {/*            className="!bg-blue-100 text-blue-700"*/}
      {/*            onClick={() => publishPost(id)}*/}
      {/*          >*/}
      {/*            Publish*/}
      {/*          </Button>*/}
      {/*          <Button*/}
      {/*            className="!bg-blue-100 text-blue-700"*/}
      {/*            onClick={() => Router.push("/draft/[id]", `/draft/${id}`)}*/}
      {/*          >*/}
      {/*            Edit*/}
      {/*          </Button>*/}
      {/*        </>*/}
      {/*      )}*/}
      {/*      <Button*/}
      {/*        className="!bg-red-100 text-red-700"*/}
      {/*        onClick={() => deletePost(id)}*/}
      {/*      >*/}
      {/*        Delete*/}
      {/*      </Button>*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*</div>*/}

      {/*<div className="mt-10 prose prose-zinc max-w-none">*/}
      {/*  {!published && <div>(Draft)</div>}*/}

      {/*  <p>{user.name}</p>*/}

      {/*  <div className="text-5xl leading-none font-bold">{title}</div>*/}

      {/*  <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />*/}
      {/*</div>*/}
    </Layout>
  );
};

export default withPageAuthRequired(Post);
