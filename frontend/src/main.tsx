import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import keycloak from './keycloak'
import { ReactKeycloakProvider } from '@react-keycloak/web'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      networkMode: 'offlineFirst',
      refetchOnWindowFocus: false,
    },
  },
})


createRoot(document.getElementById('root')!).render(

  
  <ReactKeycloakProvider authClient={keycloak}>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  </ReactKeycloakProvider>,
  )
