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
            style={{ minWidth: '45px', aspectRatio: '1/1' }}
            className={`box-border flex justify-center items-center border hover:bg-secondary ${bought ? 'bg-accent cursor-not-allowed' : 'hover:cursor-pointer'} ${(drawn || highlight) ? 'bg-error tooltip' : ''} ${highlight ? 'animate-ping-once' : ''}`}
            data-tip="Número sorteado">
            {col}
        </div>
    );
};

export default RaffleTableCell;