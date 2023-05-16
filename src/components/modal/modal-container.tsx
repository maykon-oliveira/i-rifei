import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "~/utils/context/modal";

const ModalContainer = () => {
    const { modalContent, isOpen: modal } = useContext(ModalContext);

    if (!modal) {
        return null;
    }

    return ReactDOM.createPortal(
        <>
            <input type="checkbox" readOnly checked={modal} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    {modalContent}
                </div>
            </div>
        </>,
        document.querySelector("#modal-root")!
    );
};

export default ModalContainer;