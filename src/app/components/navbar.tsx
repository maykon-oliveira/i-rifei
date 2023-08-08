"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {

}

const Navbar: React.FC<Props> = () => {
    const { status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onLogin = () => {
        setLoading(true);
        if (status === 'authenticated') {
            router.push('/app/raffles');
            return;
        }

        void signIn('google', {
            callbackUrl: '/app/raffles'
        }).then(() => setLoading(false));
    };

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="navbar-start">
                <Link href="/" className="btn btn-ghost normal-case text-xl">
                    <Image src="/brand/brand.svg" alt="" height={55} width={55} />
                </Link>
            </div>
            <div className="navbar-end">
                <button disabled={loading} className="btn btn-outline btn-primary" onClick={onLogin}>
                    {loading && <span className="loading loading-spinner"></span>}
                    ENTRAR
                </button>
            </div>
        </div>
    );
}

export default Navbar;