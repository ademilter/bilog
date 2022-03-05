import React from "react";
import Layout from "components/Layout";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { UserProfile } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps({ req, res }) {
    const { user } = getSession(req, res);

    return {
      props: { user },
    };
  },
});

type Props = {
  user: UserProfile;
};

const Settings: React.FC<Props> = ({ user }) => {
  return (
    <Layout>
      <div>profile</div>
      <div>{JSON.stringify(user)}</div>
    </Layout>
  );
};

export default Settings;
