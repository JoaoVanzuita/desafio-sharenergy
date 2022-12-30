import './App.css'

import { AppRoutes } from './routes'
import { Login } from './shared/components'
import { DrawerMenu } from './shared/components/DrawerMenu'
import { AppThemeProvider, DrawerProvider } from './shared/contexts'

function App() {

  return (
    <AppThemeProvider>
      <Login>
        <DrawerProvider>
          <DrawerMenu>
            <AppRoutes/>
          </DrawerMenu>
        </DrawerProvider>
      </Login>
    </AppThemeProvider>
  )
}

export default App