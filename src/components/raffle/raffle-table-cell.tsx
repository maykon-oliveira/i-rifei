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
            style={{minWidth: '45px', aspectRatio: '1/1'}}
            className={`box-border flex justify-center items-center border hover:bg-secondary ${bought ? 'bg-accent cursor-not-allowed' : 'hover:cursor-pointer'} ${drawn ? 'bg-error tooltip' : ''}`}
            data-tip="Número sorteado">
            {col}
        </div>
    );
};

export default RaffleTableCell;