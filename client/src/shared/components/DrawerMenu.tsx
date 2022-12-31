import { Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'

import { useAppThemeContext, useAuthContext, useDrawerContext } from '../contexts'

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate()

  const resolvedPath = useResolvedPath(to)
  const match = useMatch({ path: resolvedPath.pathname, end: false })

  const handleClick = () => {
    navigate(to)
    onClick?.()
  }

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

interface IMenuDrawer {
  children: React.ReactNode
}
export const DrawerMenu: React.FC<IMenuDrawer> = ({children}) => {
  const theme = useTheme()
  const { currentUser } = useAuthContext()
  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext()
  const hdDown = useMediaQuery(theme.breakpoints.down(1000))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const {toggleTheme} = useAppThemeContext()

  const [completeName, setCompleteName] = useState('')

  useEffect(() => {
    if(!currentUser) return

    const name = currentUser.username.split(' ')

    for (let i = 0; i < name.length; i++) {
      name[i] = name[i][0].toUpperCase() + name[i].substr(1)
    }

    setCompleteName(name.join(' '))
  },[currentUser])

  return(
    <>
      <Drawer open={isDrawerOpen} variant={hdDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>

        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>

          <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
            <Typography variant='h5'>
              {completeName}
            </Typography>
          </Box>

          <Divider/>

          <Box flex={1}>
            <List component='nav'>
              {drawerOptions.map(drawerOption => (
                <ListItemLink
                  to={drawerOption.path}
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={hdDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar tema" />
              </ListItemButton>

              {smDown && <ListItemButton onClick={() => console.log('logout')}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>}
            </List>
          </Box>

        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={hdDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  )
}