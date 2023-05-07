import { useState } from "react";

type Props = {
    col: number
}

const RaffleTableCell: React.FC<Props> = ({ col }) => {
    const [bought, setBought] = useState(false);

    return (
        <div onClick={() => setBought(!bought)} className={`flex justify-center py-2 px-3 align-middle border border-green-600 hover:bg-green-200 hover:cursor-pointer ${bought && 'bg-red-400'}`}>
            {col}
        </div>
    );
};

export default RaffleTableCell;