"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {

}

const Navbar: React.FC<Props> = () => {
    const { status } = useSession();
    const router = useRouter();

    const onLogin = () => {
        if (status === 'authenticated') {
            router.push('/app/raffles');
            return;
        }

        void signIn('google', {
            callbackUrl: '/app/raffles'
        });
    };

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="navbar-start">
                <Link href="/" className="btn btn-ghost normal-case text-xl">I-Rifei</Link>
            </div>
            <div className="navbar-end">
                <button className="btn btn-outline btn-primary" onClick={onLogin}>Login</button>
            </div>
        </div>
    );
}

export default Navbar;