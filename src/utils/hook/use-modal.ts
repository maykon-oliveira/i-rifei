/* eslint-disable no-var */
import { type ReactNode, useState, useEffect } from "react";

// Modals should add their id here, to typescript support
declare global {
    var modalContainer: {
        showModal: () => void
    } | null
}

const useModal = () => {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);

    useEffect(() => {
        if (modalContent) {
            window.modalContainer?.showModal();
        }
    }, [modalContent]);

    const openModal = (content: ReactNode) => {
        setModalContent(content);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    return { isOpen: !!modalContent, openModal, closeModal, modalContent };
};

export default useModal;