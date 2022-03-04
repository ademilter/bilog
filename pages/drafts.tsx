import React from "react";
import Layout from "components/Layout";
import { PostProps } from "components/Post";
import prisma from "lib/prisma";
import PostList from "components/PostList";
import { deepCopy } from "lib/helper";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps({ req, res }) {
    const { user } = getSession(req, res);

    const data = await prisma.post.findMany({
      where: {
        user: { email: user.email },
        published: false,
      },
      // skip: 0,
      // take: 5,
      orderBy: {
        createdAt: "desc",
      },
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

    return {
      props: {
        data: deepCopy(data),
      },
    };
  },
});

type Props = {
  data: PostProps[];
};

const Drafts: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <div>
        <PostList data={data} />
      </div>
    </Layout>
  );
};

export default Drafts;
