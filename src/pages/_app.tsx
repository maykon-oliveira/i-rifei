import { type AppProps, type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/trpc";

import "~/styles/globals.css";
import { ModalProvider } from "~/utils/context/modal";
import { type NextPageWithLayout } from "~/utils/index";
import DashboardLayout from "~/components/layout/dashboard";
import { IconContext } from "react-icons";
import Notifications from "~/components/notifications";
import { useMemo } from "react";
import { Roboto } from 'next/font/google';

const font = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

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
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <SessionProvider session={session}>
        <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
        <IconContext.Provider value={iconConfig}>
          <Notifications />
          <ModalProvider>
            {getLayout(<Component {...pageProps} />)}
          </ModalProvider>
          <div id="modal-root"></div>
        </IconContext.Provider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
