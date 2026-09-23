import { useState } from "react"
import { ModalContext } from "./modalContext"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

interface ModalProps {
  children: React.ReactNode
}

function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<React.ReactNode>(null)
    const theme = useSelector((state:RootState) => state.theme.theme)
  const isDark = theme === "dark"
  const openModal = (content: React.ReactNode) => {
    setContent(content),
      setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setContent(null)
  }
  return (
    <ModalContext.Provider value={{
      isOpen,
      openModal,
      closeModal,
    }}>
      {children}

      {isOpen && (
        <div className="absolute w-screen flex items-center justify-center h-screen bg-black/50" onClick={closeModal}>
          <div className={`p-8 ${isDark? "bg-white text-black":"bg-[#2B2C37] text-white!"} rounded-md`} onClick={(e) => e.stopPropagation()}>
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

export default Modal