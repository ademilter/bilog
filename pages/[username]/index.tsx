import React from "react";
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";
import { DateTime } from "luxon";
import { deepCopy } from "lib/helper";
import Layout from "components/Layout";
import { selectPost } from "components/Post";
import Button from "components/Button";
import PostList from "components/PostList";
import GlobalContext from "context/global";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { username } = params;

  const user = await prisma.user.findUnique({
    where: {
      username: username as string,
    },
    select: {
      id: true,
      picture: true,
      createdAt: true,
      username: true,
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
    props: {
      profile: deepCopy(user),
    },
  };
};

const Profile: React.FC<{ profile: any }> = ({ profile }) => {
  const { username, name, picture, createdAt, posts } = profile;
  const { session } = React.useContext(GlobalContext);

  const isMe = session?.nickname === username;

  return (
    <Layout>
      <header>
        <img className="w-40 rounded-full" src={picture} alt={name} />
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-sm">
          Joined {DateTime.fromISO(createdAt).toFormat("DDD")} (
          {DateTime.fromISO(createdAt).toRelative()})
        </p>

        {isMe && (
          <div className="mt-2">
            <Link href="/settings">
              <a>Edit Profile</a>
            </Link>
          </div>
        )}
      </header>

      <PostList data={posts!} />
    </Layout>
  );
};

export default Profile;
