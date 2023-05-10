import { signIn, signOut, useSession } from "next-auth/react";
import { IoLogOutOutline, IoLogInOutline } from 'react-icons/io5';

import Link from "next/link";
import { useRouter } from "next/router";

const NavBar: React.FC = () => {
    const router = useRouter();
    const { data: sessionData } = useSession();

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link href={'/'}>Início</Link>
                        </li>
                        {sessionData && (<li>
                            <Link href={'/raffles/new'}>Nova Rifa</Link>
                        </li>)}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">I-Rifei</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link href={'/'}>Início</Link>
                    </li>
                    {sessionData && (<li>
                        <Link href={'/raffles/new'}>Nova Rifa</Link>
                    </li>)}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-primary btn-sm gap-2" onClick={sessionData ? () => void signOut({ callbackUrl: '/' }) : () => void signIn()}>
                    {sessionData ? (<LogoutButton />) : (<LoginButton />)}
                </button>
            </div>
        </div>
    );
};

export default NavBar;

const LoginButton = () => (
    <>
        <span className="mr-1">Entrar</span>
        <IoLogInOutline />
    </>
)

const LogoutButton = () => (
    <>
        <span className="mr-1">Sair</span>
        <IoLogOutOutline />
    </>
)