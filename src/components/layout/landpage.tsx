import Head from "next/head";
import Link from "next/link";
import { type ReactNode } from "react";

type Props = {
    children: ReactNode
}

const LandpageLayout = ({ children }: Props) => {
    return (
        <>
            <Head>
                <title>I-Rifei</title>
                <meta name="description" content="Descubra um mundo de sorteios empolgantes" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="navbar bg-base-100 shadow-md">
                <Link href="/" className="btn btn-ghost normal-case text-xl">I-Rifei</Link>
            </div>
            <main className="container mx-auto flex min-h-screen flex-col">
                {children}
            </main>
        </>
    );
};

export default LandpageLayout;