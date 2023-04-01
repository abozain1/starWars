import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import type { AppProps } from "next/app";
import { useState } from "react";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <MantineProvider withNormalizeCSS>
            <Component {...pageProps} />
          </MantineProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
