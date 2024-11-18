import Keycloak from "keycloak-js"

const keycloak = new Keycloak({
    realm: "polling-app",
    url: import.meta.env.VITE_KEYCLOAK_URL,
    clientId: "polling-app-frontend",
})

export default keycloak
