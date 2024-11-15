import React, { useEffect } from "react"
import ReactDOM from "react-dom"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title: string
    width?: string
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
}) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("keydown", handleEscape)
        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [onClose])

    if (!isOpen) return null

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10 dark:bg-gray-800">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold mb-4">{title}</h2>
                    <button
                        className="relative bottom-5 text-gray-600"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                {children}
            </div>
        </div>,
        document.body,
    )
}

export default Modal
