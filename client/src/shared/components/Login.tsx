import { Box, Button, Card, CardActions, CardContent, Icon, LinearProgress, List, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import * as yup from 'yup'

import { useAppThemeContext, useAuthContext } from '../contexts'
import { AuthService } from '../services/api/auth'

interface ILoginProps {
  children: React.ReactNode
}

const loginSchema = yup.object().shape({
  username: yup.string().min(3).required(),
  password: yup.string().min(8).required()
})

export const Login: React.FC<ILoginProps> = ( {children} ) => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const {toggleTheme} = useAppThemeContext()
  const { isAuthenticated } = useAuthContext()

  const [ isLoading, setIsLoading ] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const teste = true

  if(isAuthenticated){
    return <>{children}</>
  }

  return(
    <Box width='100vw' height='100vh' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>

      <Box position='absolute' top='15px' right='15px'>
        <List component="nav">
          <ListItemButton onClick={toggleTheme} component={Paper}>
            <ListItemIcon>
              <Icon>dark_mode</Icon>
            </ListItemIcon>
            <ListItemText primary="Alternar tema" />
          </ListItemButton>
        </List>
      </Box>

      <Box position='absolute' top={70}>
        <Typography variant='overline' fontSize={smDown ? 30 : mdDown ? 40 : 50}>
          Desafio Sharenergy
        </Typography>
      </Box>

      <Card>

        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={250}>
            <Typography variant='h5' align='center'>
              Login
            </Typography>

            <TextField fullWidth label='Email' type='email'
              value={username}
              error={!!usernameError}
              disabled={isLoading}
              helperText={usernameError}
              onChange={ev => setUsername(ev.currentTarget.value)}
              onKeyDown={() => setUsernameError('')}
            />
            <TextField fullWidth label='Senha' type='password'
              value={password}
              error={!!passwordError}
              disabled={isLoading}
              helperText={passwordError}
              onChange={ev => setPassword(ev.currentTarget.value)}
              onKeyDown={() => setPasswordError('')}
            />
          </Box>


        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>

            <Button disabled={isLoading} variant='contained' onClick={() => {
              AuthService.login('desafiosharenergy', 'sh@r3n3rgy', true)
            }}>
              Entrar
            </Button>

          </Box>
        </CardActions>

        {isLoading && <LinearProgress variant='indeterminate'/>}
      </Card>

    </Box>
  )
}