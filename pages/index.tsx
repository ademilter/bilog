import React from "react";
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";
import { deepCopy } from "lib/helper";
import { PostProps, selectPost } from "components/Post";
import Layout from "components/Layout";
import PostList from "components/PostList";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const data = await prisma.post.findMany({
    where: {
      published: true,
    },
    // skip: 0,
    // take: 5,
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
      <div>
        <PostList data={data} />
      </div>
    </Layout>
  );
};

export default Index;
