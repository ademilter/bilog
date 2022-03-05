import React from "react";
import { GetServerSideProps } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "lib/prisma";
import { deepCopy } from "lib/helper";
import Layout from "components/Layout";
import { selectPost } from "../../components/Post";
import PostList from "../../components/PostList";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { username } = params;

  const user = await prisma.user.findUnique({
    where: { username: username as string },
    select: {
      id: true,
      picture: true,
      createdAt: true,
      name: true,
      posts: {
        select: selectPost,
      },
    },
  });

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: { user: deepCopy(user) },
  };
};

const Profile: React.FC<{ user }> = ({ user }) => {
  console.log(user);

  return (
    <Layout>
      <div>
        <img className="w-40 rounded-full" src={user.picture} alt={user.name} />
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-sm">
          Joined {new Date(user.createdAt).toDateString()}
        </p>
        <PostList data={user.posts!} />
      </div>
    </Layout>
  );
};

export default withPageAuthRequired(Profile);
