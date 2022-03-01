import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import "styles/global.css";
import { GlobalStoreProvider } from "store/global";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalStoreProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Bilog</title>
        </Head>

        <Component {...pageProps} />
      </GlobalStoreProvider>
    </SessionProvider>
  );
};

export default App;
