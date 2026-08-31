import React, { createContext } from "react";

interface ModalContextValue {
    isOpen: boolean,
    openModal: (context: React.ReactNode) => void,
    closeModal: () => void
}

export const ModalContext = createContext<ModalContextValue | null>(null)
