import React, { ReactNode } from "react";
import NavBar from "./navbar";
import Link from "next/link";
import BreadcrumbsProvider from "~/utils/context/breadcrumbs";
import Breadcrumbs from "../breadcrumbs";
import routes from "~/utils/routes";
import { useRouter } from "next/router";

type Props = {
    children: ReactNode
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
    const router = useRouter();

    return (
        <div className="drawer drawer-mobile">
            <input id="drawer" type="checkbox" className="drawer-toggle" />
            <BreadcrumbsProvider>
                <div className="drawer-content flex flex-col bg-base-100 overflow-x-hidden">
                    <div className="sticky top-0 left-0 z-30 flex bg-opacity-90 backdrop-blur shadow-md bg-base-100">
                        <NavBar routes={routes} />
                    </div>
                    <Breadcrumbs />
                    <main className="px-6 xl:pr-2 pb-16">
                        {children}
                    </main>
                </div>
            </BreadcrumbsProvider>
            <div className="drawer-side bg-base-200">
                <label htmlFor="drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-72">
                    {routes.map((nav, i) => (
                        <li key={i} className="hover-bordered">
                            <Link className={(router.asPath.startsWith(nav.link)) ? "active" : ''} href={nav.link}>
                                {nav.icon}
                                {nav.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DashboardLayout;