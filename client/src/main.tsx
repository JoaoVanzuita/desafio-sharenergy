import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AppThemeProvider } from './shared/contexts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppThemeProvider>
)
