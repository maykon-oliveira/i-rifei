import React from "react";

type Props = {
    drawn: boolean;
}

const Drawn: React.FC<Props> = ({ drawn }) => {
    return (
        <div className={`badge ${drawn ? 'badge-success' : 'badge-error'} gap-2`}>
            {drawn ? 'Sim' : 'Não'}
        </div>
    );
}

export default Drawn;