import React from "react";
import NewPost from "components/New";
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";
import { deepCopy } from "lib/helper";
import { selectPost } from "components/Post";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;

  const post = await prisma.post.findFirst({
    where: { id: id as string, published: false },
    select: selectPost,
  });

  console.log(post);

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

export default function DraftPost({ post }) {
  return <NewPost post={post} />;
}
