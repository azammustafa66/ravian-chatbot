// main.tsx
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './App.tsx'
import { darkTheme, lightTheme } from './theme.ts'
import { useStore } from './utils/store.ts' // Import your Zustand store

// eslint-disable-next-line react-refresh/only-export-components
const ThemeWrapper = () => {
  const { theme } = useStore()

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<ThemeWrapper />)
