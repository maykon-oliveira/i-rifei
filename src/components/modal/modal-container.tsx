import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "~/utils/context/modal";

const ModalContainer = () => {
    const { modalContent } = useContext(ModalContext);

    if (!modalContent) {
        return null;
    }

    return ReactDOM.createPortal(
        <>
            <dialog id="modalContainer" className="modal">
                <form method="dialog" className="modal-box">
                    {modalContent}
                </form>
            </dialog>
        </>,
        document.querySelector("#modal-root")!
    );
};

export default ModalContainer;