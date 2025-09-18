import { DarkModeToggle } from "@components/Header/DarkModeToggle"
import { Login } from "@components/Header/Login"
import { NavMenu } from "@components/Header/NavMenu"
import { NewQuestion } from "@components/Header/NewQuestion"
import { useKeycloak } from "@react-keycloak/web"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Header: React.FC = () => {
    //nav menu with home on the left and login and register on the right
    const { keycloak } = useKeycloak()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <header className="bg-purple-500 text-white p-4 shadow-md ">
            <div className="container mx-auto flex justify-between items-center">
                <h1
                    onClick={() => navigate("/")}
                    className="text-2xl font-bold cursor-pointer"
                >
                    Pollify App
                </h1>
                <button className="block lg:hidden" onClick={toggleMenu}>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
                <NavMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}>
                    <DarkModeToggle />
                    {keycloak.authenticated && (
                        <>
                            <div>
                                <button onClick={() => navigate("/my-votes")}>
                                    My Votes
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => navigate("/my-questions")}
                                >
                                    My Questions
                                </button>
                            </div>
                            <NewQuestion />
                        </>
                    )}
                    <Login />
                </NavMenu>
            </div>
        </header>
    )
}
