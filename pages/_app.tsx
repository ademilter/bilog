import { AppProps } from "next/app";
import Head from "next/head";
import "styles/global.css";
import { GlobalStoreProvider } from "context/global";
import { Provider } from "use-http";
import { UserProvider } from "@auth0/nextjs-auth0";

const App = ({ Component, pageProps }: AppProps) => {
  const { user } = pageProps;

  const options = {
    interceptors: {
      request: async ({ options, url, path, route }) => {
        return options;
      },
      response: async ({ response }) => {
        return response;
      },
    },
  };

  return (
    <UserProvider user={user}>
      <Provider url={process.env.NEXT_PUBLIC_API_URL} options={options}>
        <GlobalStoreProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>Bilog</title>
          </Head>

          <Component {...pageProps} />
        </GlobalStoreProvider>
      </Provider>
    </UserProvider>
  );
};

export default App;
