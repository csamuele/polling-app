import React from "react";
import { useKeycloak } from '@react-keycloak/web'

export const Login: React.FC = () => {
    const { keycloak } = useKeycloak()
    return (
        <div>
            {keycloak.authenticated ? (
                <button onClick={() => keycloak.logout()}>Logout</button>
            ) : (
                <button onClick={() => keycloak.login()}>Login</button>
            )}
        </div>
    )
}