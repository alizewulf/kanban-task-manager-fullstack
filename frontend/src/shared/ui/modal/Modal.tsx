import { useState } from "react"
import { ModalContext } from "./modalContext"

interface ModalProps {
  children: React.ReactNode
}

function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<React.ReactNode>(null)

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
          <div className="bg-white p-8 text-black" onClick={(e) => e.stopPropagation()}>
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

export default Modal