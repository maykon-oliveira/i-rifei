import { signIn, signOut, useSession } from "next-auth/react";
import { IoLogOutOutline, IoSearchOutline, IoNotificationsOutline, IoMenuOutline } from 'react-icons/io5';

import { type RouteItem } from "~/utils/routes";

type Props = {
    routes: RouteItem[];
}

const NavBar: React.FC<Props> = ({ routes }) => {
    const { data: sessionData } = useSession();

    return (
        <div className="navbar">
            <div className="navbar-start">
                <label htmlFor="drawer" className="btn btn-ghost drawer-button lg:hidden">
                    <IoMenuOutline />
                </label>
                <div className="form-control hidden md:flex">
                    <div className="join">
                        <button className="btn btn-square btn-ghost join-item">
                            <IoSearchOutline />
                        </button>
                        <input type="text" placeholder="Pesquisar…" className="input input-ghost join-item" />
                    </div>
                </div>
            </div>
            <div className="navbar-end">
                <div className="tooltip tooltip-bottom" data-tip="Notificações">
                    <button className="btn btn-ghost">
                        <IoNotificationsOutline />
                    </button>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={sessionData?.user.image ?? ''} referrerPolicy="no-referrer" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a onClick={() => void signOut({ callbackUrl: '/' })}>
                                <IoLogOutOutline/>
                                Sair
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
