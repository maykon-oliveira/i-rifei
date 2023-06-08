type Props = {
    col: number;
    bought: boolean;
    drawn: boolean;
    highlight?: boolean;
    onClick: (ticket: number) => void
}

const RaffleTableCell: React.FC<Props> = ({ col, bought, drawn, onClick, highlight = false }) => {
    const handleClick = () => {
        if (!bought) {
            onClick(col);
        }
    }

    return (
        <div onClick={handleClick}
            style={{ aspectRatio: '1/1' }}
            className={`box-border flex justify-center items-center border border-gray-300 ${bought ? 'bg-primary cursor-not-allowed' : 'bg-neutral hover:cursor-pointer hover:bg-neutral-400'} ${(drawn || highlight) ? 'bg-error tooltip' : ''} ${highlight ? 'animate-ping-once' : ''}`}
            data-tip="Número sorteado">
            {col}
        </div>
    );
};

export default RaffleTableCell;