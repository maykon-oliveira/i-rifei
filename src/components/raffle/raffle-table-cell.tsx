type Props = {
    col: number;
    bought: boolean;
    onClick: (ticket: number) => void
}

const RaffleTableCell: React.FC<Props> = ({ col, bought, onClick }) => {
    const handleClick = () => {
        if (!bought) {
            onClick(col);
        }
    }

    return (
        <div onClick={handleClick} className={`flex justify-center items-center py-2 px-3 border hover:bg-secondary ${bought ? 'bg-error cursor-not-allowed' : 'hover:cursor-pointer'}`}>
            {col}
        </div>
    );
};

export default RaffleTableCell;