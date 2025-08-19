import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Overlay, ModalContainer } from "./Modal.styles";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Overlay
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // fecha ao clicar fora
                >
                    <ModalContainer
                        as={motion.div}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} // tipo adicionado
                    >
                        {children}
                    </ModalContainer>
                </Overlay>
            )}
        </AnimatePresence>
    );
};