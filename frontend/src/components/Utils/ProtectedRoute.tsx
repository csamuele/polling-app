import { useKeycloak } from "@react-keycloak/web"
import { Outlet } from "react-router-dom"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = () => {
    const { keycloak } = useKeycloak()
    const location = useLocation()
    if (location.hash != "" || keycloak.authenticated) {
        return <Outlet />
    } else {
        return <Navigate to="/login" state={{ from: location }} />
    }
}

export default ProtectedRoute
