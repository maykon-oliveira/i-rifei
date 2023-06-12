import React from "react";
import Loading from "./loading";

type Props = {
    active: boolean
    children: React.ReactNode
}

const Overlay: React.FC<Props> = ({ active, children }) => {
    if (!active) {
        return <>{children}</>
    }
    
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-50">
                <Loading />
            </div>
            <div className="opacity-60">
                {children}
            </div>
        </div>
    );
}

export default Overlay;