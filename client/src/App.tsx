import './App.css'

import { Login } from './components'
import { DrawerMenu } from './components/app/DrawerMenu'
import { AppRoutes } from './routes'
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts'

function App() {

  return (
    <AuthProvider>

      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <DrawerMenu>
              <AppRoutes/>
            </DrawerMenu>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  )
}

export default App