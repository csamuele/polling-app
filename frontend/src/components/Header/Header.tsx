import React, {useState} from "react";
import { Login } from "@components/Header/Login";
import { NewQuestion } from "@components/Header/NewQuestion";
import { useKeycloak } from "@react-keycloak/web";

export const Header: React.FC = () => {
    //nav menu with home on the left and login and register on the right
    const {keycloak} = useKeycloak();
    return (
        <header className="bg-purple-500 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Poll App</h1>
                <nav>
                    <div className="flex space-x-12 text-lg">
                        {keycloak.authenticated && <NewQuestion />}
                        <Login />
                        
                    </div>
                </nav>
            </div>

        </header>
    )
}