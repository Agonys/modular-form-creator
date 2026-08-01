import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { App } from './App'
import { GlobalStyles } from './design-system/theme/GlobalStyles'
import { theme } from './design-system/theme/theme'
import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
        <ToastContainer position="top-right" autoClose={3000} pauseOnHover={false} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
