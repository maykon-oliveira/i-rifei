import { AppProps, type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/trpc";

import "~/styles/globals.css";
import { ModalProvider } from "~/utils/context/modal";
import { NextPageWithLayout } from "~/utils";
import DashboardLayout from "~/components/layout/dashboard";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <DashboardLayout>{page}</DashboardLayout>);

  return (
    <SessionProvider session={session}>
      <ModalProvider>
        {getLayout(<Component {...pageProps} />)}
      </ModalProvider>
      <div id="modal-root"></div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
