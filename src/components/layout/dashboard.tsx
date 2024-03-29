import React, { type ReactNode } from "react";
import NavBar from "./navbar";
import Link from "next/link";
import BreadcrumbsProvider from "~/utils/context/breadcrumbs";
import Breadcrumbs from "../breadcrumbs";
import routes from "~/utils/routes";
import { useRouter } from "next/router";
import Image from "next/image";

type Props = {
    children: ReactNode
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
    const router = useRouter();

    return (
        <div className="drawer lg:drawer-open">
            <input id="drawer" type="checkbox" className="drawer-toggle" />
            <BreadcrumbsProvider>
                <div className="drawer-content flex flex-col bg-base-100">
                    <div className="sticky top-0 z-10 flex bg-opacity-90 backdrop-blur shadow-md bg-base-100">
                        <NavBar />
                    </div>
                    <div className="min-h-[92vh] overflow-y-auto pt-3 px-6  bg-base-200">
                        <Breadcrumbs />
                        <main className="card bg-base-100 p-6 mt-5">
                            {children}
                        </main>
                    </div>
                </div>
            </BreadcrumbsProvider>
            <div className="drawer-side z-50">
                <label htmlFor="drawer" className="drawer-overlay"></label>
                <aside className="bg-base-100 w-64 h-full">
                    <div className="px-4 pt-4">
                        <Link href="/" className="btn btn-ghost normal-case text-xl w-full justify-start">
                            <Image src="/brand/brand.svg" alt="" height={55} width={55} />
                        </Link>
                    </div>
                    <ul className="menu menu-sm lg:menu-md px-4">
                        {routes.map((nav, i) => (
                            <li key={nav.link} className="hover-bordered my-1">
                                <Link className={(router.asPath.startsWith(nav.link)) ? "active" : ''} href={nav.link}>
                                    {nav.icon}
                                    {nav.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    );
}

export default DashboardLayout;