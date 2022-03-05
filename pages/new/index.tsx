import React from "react";
import NewPost from "components/New";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

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
  return <NewPost post={post} />;
}
