import { type NextPage } from "next";
import { type ReactElement, type ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export const delay = () => new Promise(resolve => setTimeout(resolve, 5000));