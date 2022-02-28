import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import type { Provider } from "next-auth/providers";

type Props = {
  providers: Provider[];
};

export default function SignIn({ providers }: Props) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, query } = context;
  const redirect = query.redirect || "/";

  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: redirect },
    };
  }

  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
}
