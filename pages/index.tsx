import React from "react";
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";
import { deepCopy } from "lib/helper";
import { PostProps, selectPost } from "components/Post";
import Layout from "components/Layout";
import PostList from "components/PostList";

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: selectPost,
  });

  return {
    props: {
      data: deepCopy(data),
    },
  };
};

type Props = {
  data: PostProps[];
};

const Index: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <main className="py-10">
        <PostList data={data} />
      </main>
    </Layout>
  );
};

export default Index;
