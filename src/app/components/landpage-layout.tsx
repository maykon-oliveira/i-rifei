import React from "react";
import Navbar from "./navbar"

type Props = {
    children: React.ReactNode
}

const LandpageLayout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="container mx-auto flex min-h-[94vh] flex-col">
                {children}
            </main>
        </>
    )
}

export default LandpageLayout;
