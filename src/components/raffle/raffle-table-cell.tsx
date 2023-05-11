import { useState } from "react";

type Props = {
    col: number;
    viewOnly: boolean;
}

const RaffleTableCell: React.FC<Props> = ({ col, viewOnly }) => {
    const [bought, setBought] = useState(false);

    return (
        <div onClick={() => !viewOnly && setBought(!bought)} className={`flex justify-center items-center py-2 px-3 border hover:bg-secondary hover:cursor-pointer ${bought && 'bg-error'}`}>
            {col}
        </div>
    );
};

export default RaffleTableCell;