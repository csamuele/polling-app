import { Header } from '@components/Header'
import { Home } from '@pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

function App() {
  const [reactQueryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          networkMode: 'offlineFirst',
          refetchOnWindowFocus: false,
        },
      },
    }),
  )
  return (
    <QueryClientProvider client={reactQueryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
