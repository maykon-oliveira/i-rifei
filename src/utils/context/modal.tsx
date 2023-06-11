import React, { type ReactNode, createContext } from "react";
import ModalContainer from "~/components/modal/modal-container";
import useModal from "../hook/use-modal";

type ModalContext = {
    isOpen: boolean;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
    modalContent: ReactNode;
};

export const ModalContext = createContext<ModalContext>({
    isOpen: false,
    openModal: (_) => {
        // pass
    },
    closeModal: () => {
        // pass
    },
    modalContent: ''
});

type Props = {
    children: ReactNode
}

export const ModalProvider: React.FC<Props> = ({ children }) => {
    const { isOpen, openModal, closeModal, modalContent } = useModal();

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalContent }}>
            <ModalContainer />
            {children}
        </ModalContext.Provider>
    );
};