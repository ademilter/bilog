import React from "react";
import Layout from "components/Layout";
import { PostProps, selectPost } from "components/Post";
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
      <div>
        <PostList data={data} />
      </div>
    </Layout>
  );
};

export default Drafts;
