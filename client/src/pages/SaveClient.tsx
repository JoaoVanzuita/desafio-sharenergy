import { Alert, Box, Divider, LinearProgress, Paper, Snackbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Toolbar } from '../shared/components'
import { FormTextField, IFormErrors } from '../shared/forms'
import { numberMaskInput, showApiErrorAlert } from '../shared/functions'
import { BasePageLayout } from '../shared/layouts/BaseLayout'
import { ResponseError } from '../shared/services/api/axios-config/errors'
import { ClientsService } from '../shared/services/api/clients'
import { TClient } from '../shared/types'

type TFormData = Omit<TClient, '_id'>

const formValidationSchema: yup.SchemaOf<TFormData> = yup.object().shape({
  name: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  cpf: yup.string().length(11).required(),
  phone: yup.string().max(13).required(),
  address: yup.object().shape({
    city: yup.string().min(3).max(20).required(),
    street: yup.string().min(3).max(20).required(),
    number: yup.number().typeError('O campo deve conter um número').min(1).required()
  })
})

export const SaveClient = () => {
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))
  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'

  const navigate = useNavigate()
  const formRef = useRef<FormHandles>(null)
  const { id = 'novo' } = useParams<'id'>()

  const [isLoading, setIsLoading] = useState(true)
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false)

  useEffect(() => {

    if(id === 'novo'){
      setIsLoading(false)
      return
    }

    ClientsService.getClientById(id).then(result => {
      setIsLoading(false)

      if(result instanceof ResponseError ){
        showApiErrorAlert({message: result.message, alertBackground, alertColor})
        return
      }

      formRef.current?.setData(result)
    })
  }, [])

  const createClient = useCallback((clientData: TFormData) => {
    ClientsService.createClient(clientData).then(result => {
      setIsLoading(false)

      if(result instanceof ResponseError){
        showApiErrorAlert({ message: result.message, alertBackground, alertColor })
        return
      }

      navigate(`/gerenciar-clientes/${result._id}`)
    })
  },[theme])

  const updateClient = useCallback((id: string, clientData: TFormData) => {
    ClientsService.updateClient({
      _id: id,
      ...clientData
    }).then(result => {
      setIsLoading(false)

      if(result instanceof ResponseError){
        showApiErrorAlert({ message: result.message, alertBackground, alertColor })
        return
      }
      setOpenSuccessAlert(true)
    })
  },[theme])

  const handleSave = (formData: TFormData) => {
    setIsLoading(true)

    formValidationSchema.validate(formData, { abortEarly: false })
      .then(validData => {

        if(id === 'novo'){
          createClient(validData)
          return
        }

        updateClient(id, validData)
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
  }

  return(
    <BasePageLayout title={id === 'novo' ? 'Novo cliente' : 'Editar cliente'} toolbar={
      <Toolbar
        showButtonSave
        showButtonBack

        onClickButtonSave={() => formRef.current?.submitForm()}
        onClickButtonBack={() => navigate('/gerenciar-clientes')}
      />
    }>
      <Snackbar open={openSuccessAlert} autoHideDuration={3000} onClose={() => setOpenSuccessAlert(false)}>
        <Alert onClose={() => setOpenSuccessAlert(false)} severity='success' sx={{ width: '100%' }}>
          Informações atualizadas com sucesso
        </Alert>
      </Snackbar>

      <Box display='flex' flexDirection='column' padding={3}>

        <Typography variant={smUp ? 'h4' : 'h5'} alignSelf='center' paddingBottom={3}>
          Dados do cliente
        </Typography>

        {isLoading && <LinearProgress variant='indeterminate'/>}

        <Form ref={formRef} onSubmit={handleSave}>

          <Box margin={1} display='flex' alignContent='center' component={Paper}
            paddingY={4}
            paddingX={smUp ? 4 : 2}
            gap={smUp ? 5 : 2}
            flexDirection={smUp ? 'row' : 'column'}
          >

            <Box display='flex' flexDirection='column' alignContent='center' gap={2}>

              <FormTextField name='name' label='Nome completo' inputProps={{ maxLength: 20 }}   disabled={isLoading} />
              <FormTextField name='email' label='Email'  disabled={isLoading} />
              <FormTextField name='phone' label='Telefone' disabled={isLoading}
                inputProps={{ maxLength: 13 }}
                onKeyDown={ev => numberMaskInput(ev)}
              />
              <FormTextField name='cpf' label='CPF' disabled={isLoading}
                inputProps={{ maxLength: 11 }}
                onKeyDown={ev => numberMaskInput(ev)}
              />
            </Box>

            {smUp && <Divider orientation='vertical' flexItem/>}

            <Box display='flex' flexDirection='column' alignContent='center' gap={2}>

              <Typography variant={smUp ? 'h5' : 'h6'} alignSelf='center' paddingBottom={smUp ? 3 : 0}>
                Endereço
              </Typography>

              <Box display='flex' flexDirection='column' alignContent='center' gap={2}>

                <FormTextField name='address.city' label='Cidade' inputProps={{ maxLength: 20 }}  disabled={isLoading} />
                <FormTextField name='address.street' label='Rua' inputProps={{ maxLength: 20 }}  disabled={isLoading} />
                <FormTextField name='address.number' label='Número' disabled={isLoading}
                  onKeyDown={ev => numberMaskInput(ev)}
                />

              </Box>

            </Box>
          </Box>
        </Form>

      </Box>
    </BasePageLayout>
  )
}