import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Card, Checkbox, FormControlLabel, Icon, IconButton, InputAdornment, LinearProgress,List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback,useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { useAppThemeContext, useAuthContext } from '../../shared/contexts'
import { showApiErrorAlert } from '../../shared/functions'
import { ResponseError } from '../../shared/services/api/axios-config/errors'
import { encryptStorage } from '../../shared/utils'
import { FormTextField,IFormErrors } from '../forms'

type TFormData = {
  username: string,
  password: string
}

interface ILoginProps {
  children: React.ReactNode
}

const formValidationSchema = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  password: yup.string().min(8).max(20).required()
})

export const Login: React.FC<ILoginProps> = ( {children} ) => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
  const {toggleTheme} = useAppThemeContext()
  const { isAuthenticated, signin } = useAuthContext()
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()

  const [ isLoading, setIsLoading ] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    setShowPass(false)

    const userData = encryptStorage.getItem('user_credentials')

    if(!userData) return

    formRef.current?.setData(userData)
  }, [isAuthenticated])

  const login = useCallback((userData: TFormData) => {
    signin(userData.username, userData.password).then(result => {
      setIsLoading(false)

      if(result instanceof ResponseError){
        showApiErrorAlert({ message: result.message, alertBackground, alertColor })
        return
      }

      if(rememberMe){
        encryptStorage.setItem('user_credentials', JSON.stringify(userData))
      }
      navigate('/')
    })
  }, [theme, rememberMe])

  const handleSubmit = useCallback((formData: TFormData) => {
    setIsLoading(true)

    formValidationSchema.validate(formData, { abortEarly: false })
      .then(validData => {

        login(validData)
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false)

        const validationErrors: IFormErrors = {}

        errors.inner.forEach(error => {
          if(!error.path) return

          validationErrors[error.path] = error.message
        })
        formRef.current?.setErrors(validationErrors)
      })
  },[rememberMe])

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

        <Box marginX={2} marginTop={2} display='flex' flexDirection='column'  width={250}>
          <Typography variant='h5' align='center' paddingBottom={2}>
              Login
          </Typography>

          <Form ref={formRef} onSubmit={handleSubmit}>

            <Box display='flex' flexDirection='column' alignContent='center' gap={4}>

              <FormTextField name='username' label='Nome de usuário'/>

              <FormTextField name='password' label='Senha' type={showPass ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => setShowPass(!showPass)} >
                        {showPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>

          </Form>
        </Box>

        <Box paddingLeft={2} paddingTop={2}>
          <FormControlLabel label='Lembrar de mim'
            control={
              <Checkbox checked={rememberMe} disabled={isLoading} onChange={() => setRememberMe(!rememberMe)}/>
            }/>
        </Box>

        <Box margin={1} display='flex' justifyContent='center'>

          <Button disabled={isLoading} variant='contained' onClick={() => formRef.current?.submitForm()}>
              Entrar
          </Button>

        </Box>

        {isLoading && <LinearProgress variant='indeterminate'/>}
      </Card>

    </Box>
  )
}