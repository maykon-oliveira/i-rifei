"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import routes from "~/utils/routes";

type Props = {

}

const Sidenav: React.FC<Props> = () => {
    const pathname = usePathname();

    return (
        <ul className="menu menu-sm lg:menu-md px-4">
            {routes.map((nav) => (
                <li key={nav.link} className="hover-bordered my-1">
                    <Link className={(pathname?.startsWith(nav.link)) ? "active" : ''} href={nav.link}>
                        {nav.icon}
                        {nav.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Sidenav;