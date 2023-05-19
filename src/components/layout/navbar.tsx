import { signIn, signOut, useSession } from "next-auth/react";
import { IoLogOutOutline, IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5';

import Link from "next/link";
import { RouteItem } from "~/utils/routes";

type Props = {
    routes: RouteItem[];
}

const NavBar: React.FC<Props> = ({ routes }) => {
    const { data: sessionData } = useSession();

    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown mr-2">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {sessionData &&
                            (routes.map((route, i) => (
                                <li key={i}>
                                    <Link href={route.link}>
                                        {route.icon}
                                        {route.label}
                                    </Link>
                                </li>
                            )))
                        }
                    </ul>
                </div>
                <div className="form-control hidden md:flex">
                    <div className="input-group">
                        <button className="btn btn-square btn-ghost">
                            <IoSearchOutline />
                        </button>
                        <input type="text" placeholder="Pesquisar…" className="input input-ghost" />
                    </div>
                </div>
            </div>
            <div className="navbar-end">
                <div className="tooltip tooltip-bottom" data-tip="Notificações">
                    <button className="btn btn-ghost">
                        <IoNotificationsOutline />
                    </button>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="Sair">
                    <button className="btn btn-ghost" onClick={sessionData ? () => void signOut({ callbackUrl: '/' }) : () => void signIn()}>
                        <IoLogOutOutline />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
