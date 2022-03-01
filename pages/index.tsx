import React from "react";
import { GetStaticProps } from "next";
import Layout from "components/Layout";
import Post, { PostProps } from "components/Post";
import prisma from "lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};

type Props = {
  feed: PostProps[];
};

const Index: React.FC<Props> = ({ feed }) => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold">Public Feed</h1>

      <div className="mt-6 space-y-4">
        {feed.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;
