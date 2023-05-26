type Props = {
    col: number;
    bought: boolean;
    drawn: boolean;
    onClick: (ticket: number) => void
}

const RaffleTableCell: React.FC<Props> = ({ col, bought, drawn, onClick }) => {
    const handleClick = () => {
        if (!bought) {
            onClick(col);
        }
    }

    return (
        <div onClick={handleClick}
            className={`flex justify-center items-center py-2 px-3 border hover:bg-secondary ${bought ? 'bg-accent cursor-not-allowed' : 'hover:cursor-pointer'} ${drawn ? 'bg-error tooltip' : ''}`}
            data-tip="Número sorteado">
            {col}
        </div>
    );
};

export default RaffleTableCell;