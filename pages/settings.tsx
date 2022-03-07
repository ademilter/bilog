import React from "react";
import Layout from "components/Layout";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { UserProfile } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps({ req, res }) {
    const { user } = getSession(req, res);

    return {
      props: { session: user },
    };
  },
});

type Props = {
  session: UserProfile;
};

const Settings: React.FC<Props> = ({ session }) => {
  return (
    <Layout>
      <main className="py-10">
        <div>profile</div>
        <div>{JSON.stringify(session)}</div>
      </main>
    </Layout>
  );
};

export default Settings;
