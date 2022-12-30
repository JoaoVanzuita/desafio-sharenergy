import { Box, CircularProgress, List, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Toolbar } from '../shared/components'
import { showApiErrorAlert } from '../shared/functions'
import { BasePageLayout } from '../shared/layouts/BaseLayout'
import { clientsApi } from '../shared/services/api/clients'
import { TClient } from '../shared/types'

export const SaveClient = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
  const { id = 'novo' } = useParams<'id'>()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)

  const [clientData, setClientData] = useState<TClient | null>(null)

  console.log(clientData)

  const fetchClient = useCallback(async () => {

    if(id === 'novo'){
      setIsLoading(false)
      return
    }

    const result = await clientsApi.getClientById(id)

    setIsLoading(false)

    if(result instanceof Error ){
      showApiErrorAlert({message: result.message, alertBackground, alertColor})
      return
    }

    setClientData(result)
  }, [theme])

  useEffect(() => {
    fetchClient()
  }, [])

  const handleOnClickButtonSave = () => {
    console.log('save')
  }

  return(
    <BasePageLayout title={id === 'novo' ? 'Novo cliente' : 'Editar cliente'} toolbar={
      <Toolbar
        showButtonSave
        showButtonBack

        onClickButtonSave={handleOnClickButtonSave}
        onClickButtonBack={() => navigate('/gerenciar-clientes')}
      />
    }
    >

      {isLoading && <Box display='flex' justifyContent='center' alignItems='center'>

        <CircularProgress/>
      </Box>}

      <Box display='flex' flexDirection='row'
        alignContent='center'
      >



      </Box>

    </BasePageLayout>
  )
}