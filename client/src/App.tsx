import './App.css'

import { AppRoutes } from './routes'
import { Login } from './shared/components'
import { DrawerMenu } from './shared/components/DrawerMenu'
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