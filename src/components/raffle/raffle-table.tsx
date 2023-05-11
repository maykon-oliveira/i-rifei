import { useEffect, useState } from "react";
import RaffleTableCell from "./raffle-table-cell";

type Props = {
    size: number;
    viewOnly?: boolean;
}

// https://tailwindcss.com/docs/content-configuration#class-detection-in-depth
type Key0to10 = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

const gridVariants = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-4',
    '5': 'grid-cols-5',
    '6': 'grid-cols-6',
    '7': 'grid-cols-7',
    '8': 'grid-cols-8',
    '9': 'grid-cols-9',
    '10': 'grid-cols-10',
}

const RaffleTable: React.FC<Props> = ({ size, viewOnly = true }) => {

    const [matrix, setMatrix] = useState<number[][]>([]);
    const [gridClass, setGridClass] = useState<string>('');

    useEffect(() => {
        setMatrix(createMatrix(size));
    }, [size])

    useEffect(() => {
        if (10 > matrix.length && matrix.length < 2) {
            return;
        }

        setGridClass(gridVariants[matrix.length.toString() as Key0to10])
    }, [matrix])

    return (
        <div className={`grid ${gridClass} border min-h-full`}>
            {matrix.map(row => row.map((col, i) => (
                <RaffleTableCell key={i} col={col} viewOnly={viewOnly} />
            )))}
        </div>
    );
};

export default RaffleTable;

const createMatrix = (size: number): number[][] => {
    const matrix = [];

    for (let i = 0; i < size; i++) {
        const row = [];

        for (let j = 0; j < size; j++) {
            row.push((i * size + j) + 1);
        }

        matrix.push(row);
    }

    return matrix;

}