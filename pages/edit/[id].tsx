import React from "react";
import NewPost from "components/New";
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";
import { deepCopy } from "lib/helper";
import { selectPost } from "components/Post";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
};

export default function EditPost({ post }) {
  return <NewPost post={post} />;
}
