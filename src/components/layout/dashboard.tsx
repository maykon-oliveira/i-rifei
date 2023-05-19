import React, { ReactNode } from "react";
import NavBar from "./navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoTicketOutline, IoCreateOutline } from "react-icons/io5";

type Props = {
    children: ReactNode
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
    const { data: sessionData } = useSession();
    const navigation = [{
        label: 'Rifas',
        link: '/app/raffles',
        icon: <IoTicketOutline />
    }]

    return (
        <div className="drawer drawer-mobile">
            <input id="drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-base-100">
                <div className="sticky top-0 z-30 flex w-full bg-opacity-90 backdrop-blur shadow-md bg-base-100">
                    <NavBar navigation={navigation} />
                </div>
                <div className="flex flex-row justify-between items-center px-6 py-4 xl:pr-2">
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li><a>Home</a></li>
                            <li><a>Documents</a></li>
                            <li>Add Document</li>
                        </ul>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Nova Rifa">
                        <a href="/app/raffles/new" className="btn btn-primary">
                            <IoCreateOutline size={20} />
                        </a>
                    </div>
                </div>
                <main className="px-6 xl:pr-2 pb-16">
                    {children}
                </main>
            </div>
            <div className="drawer-side bg-base-200">
                <label htmlFor="drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-72">
                    {sessionData &&
                        (navigation.map(nav => (
                            <li className="hover-bordered">
                                <Link href={nav.link}>
                                    {nav.icon}
                                    {nav.label}
                                </Link>
                            </li>
                        )))
                    }
                </ul>
            </div>
        </div>
    );
}

export default DashboardLayout;