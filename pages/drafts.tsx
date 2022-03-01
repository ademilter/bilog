import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Layout from "components/Layout";
import { PostProps } from "components/Post";
import prisma from "lib/prisma";
import GlobalStoreContext from "store/global";
import PostList from "components/PostList";
import { deepCopy } from "lib/helper";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const data = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
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
      published: true,
      createdAt: true,
      author: {
        select: {
          email: true,
          name: true,
          image: true,
        },
      },
    },
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

const Drafts: React.FC<Props> = ({ data }) => {
  const { session } = React.useContext(GlobalStoreContext);

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <PostList data={data} />
      </div>
    </Layout>
  );
};

export default Drafts;
