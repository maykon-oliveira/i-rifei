import React, { useContext } from "react";
import { ModalContext } from "~/utils/context/modal";

type Props = {
    ticketNumber: number;
    onConfirm: () => void;
}

const RaffleBuyModal: React.FC<Props> = ({ ticketNumber, onConfirm }) => {
    const { closeModal } = useContext(ModalContext);

    const handleOnConfirm = () => {
        onConfirm();
        closeModal();
    }

    return (
        <div className="text-center">
            <h3>Confimar a compra do número</h3>
            <p className="font-bold text-5xl py-5">{ticketNumber}</p>
            <div className="modal-action justify-center">
                <button onClick={handleOnConfirm} className="btn btn-primary">CONFIRMAR</button>
                <button onClick={closeModal} className="btn btn-outline">CANCELAR</button>
            </div>
        </div>
    );
}

export default RaffleBuyModal;