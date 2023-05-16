import { ReactNode, useState } from "react";

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);

    const openModal = (content: ReactNode) => {
        setIsOpen(true);
        setModalContent(content);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalContent(null);
    };

    return { isOpen, openModal, closeModal, modalContent };
};

export default useModal;