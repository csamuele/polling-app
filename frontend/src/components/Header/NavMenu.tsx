import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

interface MobileNavProps {
    isMenuOpen: boolean
    toggleMenu: () => void
    children?: React.ReactNode
}

export const NavMenu: React.FC<MobileNavProps> = ({
    isMenuOpen,
    toggleMenu,
    children,
}) => {
    const location = useLocation()
    const pathname = location.pathname
    useEffect(() => {
        if (isMenuOpen) {
            toggleMenu()
        }
    }, [pathname])
    return (
        <>
            <nav className="hidden lg:flex lg:items-center lg:space-x-12 text-lg">
                {children}
            </nav>

            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 
                    ${isMenuOpen ? "block" : "hidden"}`}
                onClick={toggleMenu}
            ></div>
            <div
                className={`fixed top-0 left-0 w-64 bg-purple-500 text-white h-full
                    z-50 transform 
                    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
                    transition-transform duration-300 ease-in-out`}
            >
                <button className="text-white" onClick={toggleMenu}>
                    <svg
                        className="w-6 h-6 m-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
                <nav className="flex flex-col p-4 space-y-4">{children}</nav>
            </div>
        </>
    )
}
