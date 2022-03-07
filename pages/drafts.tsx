import React from "react";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import prisma from "lib/prisma";
import { deepCopy } from "lib/helper";
import Layout from "components/Layout";
import PostList from "components/PostList";
import { PostProps, selectPost } from "components/Post";

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps({ req, res }) {
    const { user } = getSession(req, res);

    const data = await prisma.post.findMany({
      where: {
        user: { email: user.email },
        published: false,
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
  },
});

type Props = {
  data: PostProps[];
};

const Drafts: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <main className="py-10">
        <PostList data={data} />
      </main>
    </Layout>
  );
};

export default Drafts;
