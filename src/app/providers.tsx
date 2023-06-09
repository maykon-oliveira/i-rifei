"use client";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { useMemo } from "react";
import { IconContext } from "react-icons";
import Notifications from "~/components/notifications";
import { ModalProvider } from "~/utils/context/modal";
import { api } from "~/utils/trpc";

type Props = {
    children: React.ReactNode;
    session: Session | null | undefined;
}

const Providers: React.FC<Props> = ({ children, session }) => {
    const iconConfig = useMemo(() => ({ size: "1.3em" }), []);

    return (
        <SessionProvider session={session}>
            <IconContext.Provider value={iconConfig}>
                <Notifications />
                <ModalProvider>
                    {children}
                </ModalProvider>
                <div id="modal-root"></div>
            </IconContext.Provider>
        </SessionProvider>
    );
}

// https://github.com/framer/motion/issues/1509
export default api.withTRPC(Providers) as any;