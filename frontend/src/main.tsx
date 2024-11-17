import { ReactKeycloakProvider } from "@react-keycloak/web"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import keycloak from "./keycloak"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            networkMode: "offlineFirst",
            refetchOnWindowFocus: false,
        },
    },
})

createRoot(document.getElementById("root")!).render(
    <ReactKeycloakProvider authClient={keycloak}>
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </StrictMode>
    </ReactKeycloakProvider>,
)
