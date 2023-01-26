import React from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
// import "../styles/demo/Demos.scss";

export default function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return (
      <SessionProvider session={pageProps.session}>
        <LayoutProvider>
          {Component.getLayout(<Component {...pageProps} />)}
        </LayoutProvider>
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={pageProps.session}>
        <LayoutProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LayoutProvider>
      </SessionProvider>
    );
  }
}
