import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "lib/prisma";
import { deepCopy } from "lib/helper";
import { selectPost } from "components/Post";
import NewPost from "components/New";

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps({ params }) {
    const { id } = params;

    const post = await prisma.post.findUnique({
      where: { id: id as string },
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
  },
});

export default function EditPost({ post }) {
  return <NewPost post={post} />;
}
