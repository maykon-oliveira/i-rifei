"use client";

import { useEffect, useState } from "react";
import RaffleGridCell from "./raffle-grid-cell";

type Props = {
    size: number;
    tickets?: { number: number, drawn: boolean }[];
    numberHighlight?: number;
    onTicketClick?: (ticket: number) => void
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

const RaffleGrid: React.FC<Props> = ({ size, tickets = [], onTicketClick = () => {}, numberHighlight }) => {
    const [matrix, setMatrix] = useState<number[][]>(createMatrix(size));
    const [gridClass, setGridClass] = useState<string>(gridVariants[matrix.length.toString() as Key0to10]);

    useEffect(() => {
        setMatrix(createMatrix(size));
    }, [size]);
    
    useEffect(() => {    
        if (10 > matrix.length && matrix.length < 2) {
            return;
        }
        setGridClass(gridVariants[matrix.length.toString() as Key0to10]);
    }, [matrix]);

    return (
        <div className={`box-border grid ${gridClass} border border-gray-300 box-border w-full`}>
            {matrix.map(row => row.map((col) => {
                const ticket = tickets.find(({ number }) => number === col);
                const highlight = !!numberHighlight && numberHighlight === col;

                return (
                    <RaffleGridCell key={col} col={col} bought={!!ticket} drawn={ticket?.drawn ?? false} highlight={highlight} onClick={onTicketClick} />
                )
            }))}
        </div>
    );
};

export default RaffleGrid;

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