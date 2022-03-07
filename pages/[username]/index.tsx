import React from "react";
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";
import { DateTime } from "luxon";
import { deepCopy } from "lib/helper";
import Layout from "components/Layout";
import { PostProps, selectPost } from "components/Post";
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

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      user: { username: username as string },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: selectPost,
  });

  return {
    props: {
      profile: deepCopy(user),
      posts: posts.length ? deepCopy(posts) : [],
    },
  };
};

const Profile: React.FC<{ profile: any; posts: PostProps[] }> = ({
  profile,
  posts,
}) => {
  const { username, name, picture, createdAt } = profile;
  const { session } = React.useContext(GlobalContext);

  const isMe = session?.nickname === username;

  return (
    <Layout>
      <header className="py-10 flex flex-col items-center text-center border-b border-gray-200">
        <img className="w-40 rounded-full" src={picture} alt={name} />
        <h1 className="text-4xl font-bold">{name}</h1>
        <p title={DateTime.fromISO(createdAt).toRelative()}>
          Joined {DateTime.fromISO(createdAt).toFormat("DDD")}
        </p>

        {isMe && (
          <div className="mt-2">
            <Link href="/settings">
              <a className="inline-flex items-center bg-gray-200 px-2 rounded-md select-none h-8">
                Edit Profile
              </a>
            </Link>
          </div>
        )}
      </header>

      <main>
        <PostList data={posts} hideAuthor />
      </main>
    </Layout>
  );
};

export default Profile;
