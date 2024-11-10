import React from "react";
import { useKeycloak } from '@react-keycloak/web'

export const Login: React.FC = () => {
    const { keycloak } = useKeycloak()
    const handleLogin = async () => {
        //login to keycloak
        keycloak.login()  


    }
    return (
        <div>
            {keycloak.authenticated ? (
                <button className="font-bold" onClick={() => keycloak.logout({redirectUri: window.location.origin})}>Logout</button>
            ) : (
                <button className="font-bold" onClick={handleLogin}>Login</button>
            )}
        </div>
    )
}