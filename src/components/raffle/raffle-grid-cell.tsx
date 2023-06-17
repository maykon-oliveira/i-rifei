type Props = {
    col: number;
    bought: boolean;
    drawn: boolean;
    highlight?: boolean;
    onClick: (ticket: number) => void
}

const RaffleGridCell: React.FC<Props> = ({ col, bought, drawn, onClick, highlight = false }) => {
    const handleClick = () => {
        if (!bought) {
            onClick(col);
        }
    }

    return (
        <div onClick={handleClick}
            style={{ aspectRatio: '1/1' }}
            className={`box-border flex justify-center items-center border border-primary ${(bought) ? `${!drawn ? 'bg-primary' : ''} cursor-not-allowed` : 'bg-base-300 hover:cursor-pointer hover:bg-neutral-400'} ${(drawn) ? 'bg-success tooltip' : ''} ${highlight ? 'animate-ping-once' : ''}`}
            data-tip="Número sorteado">
            {col}
        </div>
    );
};

export default RaffleGridCell;