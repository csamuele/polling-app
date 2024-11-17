import { useKeycloak } from "@react-keycloak/web"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import React from "react"

const Login: React.FC = () => {
    const { keycloak } = useKeycloak()
    const location = useLocation()
    const redirectUri = location.state?.from ? location.state.from : "/"
    useEffect(() => {
        if (!keycloak.authenticated) {
            keycloak.login({
                redirectUri: window.location.origin + redirectUri.pathname,
            })
        }
    }, [keycloak.authenticated, redirectUri])
    return (
        <div>
            <p>Redirecting to login..</p>
        </div>
    )
}

export default Login
