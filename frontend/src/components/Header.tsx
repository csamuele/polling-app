import React from "react";

export const Header: React.FC = () => {
    //nav menu with home on the left and login and register on the right
    return (
        <header className="bg-purple-500 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Home</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>Login</li>
                        <li>Register</li>
                    </ul>
                </nav>
            </div>

        </header>
    )
}