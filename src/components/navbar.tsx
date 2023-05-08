import { signIn, signOut, useSession } from "next-auth/react";
import { IoLogOutOutline, IoLogInOutline } from 'react-icons/io5';

import Link from "next/link";
import { useRouter } from "next/router";

const NavBar: React.FC = () => {
    const router = useRouter();
    const { data: sessionData } = useSession();

    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">Tailblocks</span>
                </a>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                    <Link href={'/'} className={`mr-5 ${router.pathname === '/' ? '' : 'hover:'}text-gray-900`}>Início</Link>
                    {sessionData && <Link href={'/raffles/new'} className={`mr-5 ${router.pathname === '/raffles/new' ? '' : 'hover:'}text-gray-900`}>Nova Rifa</Link>}
                </nav>
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={sessionData ? () => void signOut({ callbackUrl: '/' }) : () => void signIn()}>
                    {sessionData ? (<LogoutButton />) : (<LoginButton />)}
                </button>
            </div>
        </header>
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