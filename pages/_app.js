import React from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import "../styles/demo/Demos.scss";
import AuthStateChangeProvider from "context/auth";
import { UserProvider } from "@/context/user";
// create new client
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return (
      <LayoutProvider>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <AuthStateChangeProvider>
              {Component.getLayout(<Component {...pageProps} />)}
            </AuthStateChangeProvider>
          </UserProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
        </QueryClientProvider>
      </LayoutProvider>
    );
  } else {
    return (
      <LayoutProvider>
        <Layout>
          <QueryClientProvider client={queryClient}>
            <UserProvider>
              <AuthStateChangeProvider>
                <Component {...pageProps} />
              </AuthStateChangeProvider>
            </UserProvider>
            {/* <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              /> */}
          </QueryClientProvider>
        </Layout>
      </LayoutProvider>
    );
  }
}
