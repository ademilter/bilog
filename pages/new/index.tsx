import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import NewPost from "components/New";

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps() {
    return {
      props: {
        post: {},
      },
    };
  },
});

export default function CreatePost({ post }) {
  return (
    <main className="py-10">
      <NewPost post={post} />
    </main>
  );
}
