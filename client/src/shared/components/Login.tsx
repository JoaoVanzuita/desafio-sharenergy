import { Box, Button, Card, CardActions, CardContent, Icon, LinearProgress, List, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

import { useAppThemeContext } from '../contexts'





interface ILoginProps {
  children: React.ReactNode
}

export const Login: React.FC<ILoginProps> = ( {children} ) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const {toggleTheme} = useAppThemeContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const teste = true

  if(teste){
    return <>{children}</>
  }

  return(
    <Box width='100vw' height='100vh' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>

      <Box position='absolute' top='0' right='0'>
        <List component="nav">
          <ListItemButton onClick={toggleTheme} component={Paper}>
            <ListItemIcon>
              <Icon>dark_mode</Icon>
            </ListItemIcon>
            <ListItemText primary="Alternar tema" />
          </ListItemButton>
        </List>
      </Box>

      <Card>

        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={250}>
            <Typography variant='h5' align='center'>
              Login
            </Typography>

            <TextField fullWidth label='Email' type='email'
              value={email}
              error={!!emailError}
              disabled={isLoading}
              helperText={emailError}
              onChange={ev => setEmail(ev.currentTarget.value)}
              onKeyDown={() => setEmailError('')}
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

            <Button disabled={isLoading} variant='contained' onClick={() => console.log('submit')}>
              Entrar
            </Button>

          </Box>
        </CardActions>

        {isLoading && <LinearProgress variant='indeterminate'/>}
      </Card>

    </Box>
  )
}