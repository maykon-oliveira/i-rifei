import { signIn, signOut, useSession } from "next-auth/react";
import { IoLogOutOutline, IoSearchOutline, IoNotificationsOutline, IoMenuOutline } from 'react-icons/io5';

import { RouteItem } from "~/utils/routes";

type Props = {
    routes: RouteItem[];
}

const NavBar: React.FC<Props> = ({ routes }) => {
    const { data: sessionData } = useSession();

    return (
        <div className="navbar">
            <div className="navbar-start">
                <label htmlFor="drawer" className="btn btn-ghost drawer-button lg:hidden">
                    <IoMenuOutline/>
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
