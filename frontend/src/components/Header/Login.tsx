import React from "react";
import { useKeycloak } from '@react-keycloak/web'
import { useExchangeToken } from "@hooks/queries";

export const Login: React.FC = () => {
    const { keycloak } = useKeycloak()
    const handleLogin = async () => {
        //login to keycloak
        keycloak.login()  


    }
    return (
        <div>
            {keycloak.authenticated ? (
                <button className="font-bold" onClick={() => keycloak.logout()}>Logout</button>
            ) : (
                <button className="font-bold" onClick={handleLogin}>Login</button>
            )}
        </div>
    )
}