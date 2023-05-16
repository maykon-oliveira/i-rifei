import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/trpc";

import "~/styles/globals.css";
import Layout from "~/components/layout";
import { ModalProvider } from "~/utils/context/modal";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalProvider>
      <div id="modal-root"></div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
