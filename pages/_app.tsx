import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import "styles/global.css";
import { GlobalStoreProvider } from "store/global";
import { Provider } from "use-http";

const App = ({ Component, pageProps }: AppProps) => {
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
    <SessionProvider session={pageProps.session}>
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
    </SessionProvider>
  );
};

export default App;
