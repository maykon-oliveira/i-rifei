import { type AppProps, type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/trpc";

import "~/styles/globals.css";
import { ModalProvider } from "~/utils/context/modal";
import { type NextPageWithLayout } from "~/utils";
import DashboardLayout from "~/components/layout/dashboard";
import { IconContext } from "react-icons";
import Notifications from "~/components/notifications";
import { useMemo } from "react";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <DashboardLayout>{page}</DashboardLayout>);

  const iconConfig = useMemo(() => ({ size: "1.3em" }), []);

  return (
    <SessionProvider session={session}>
      <IconContext.Provider value={iconConfig}>
        <Notifications/>
        <ModalProvider>
          {getLayout(<Component {...pageProps} />)}
        </ModalProvider>
        <div id="modal-root"></div>
      </IconContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
