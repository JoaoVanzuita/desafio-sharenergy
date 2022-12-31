import { Alert, Box, CircularProgress, List, Paper, Snackbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { ClientCard, ClientListItem, Toolbar } from '../shared/components'
import { showApiErrorAlert } from '../shared/functions'
import { BasePageLayout } from '../shared/layouts/BaseLayout'
import { ResponseError } from '../shared/services/api/axios-config/errors'
import { ClientsService } from '../shared/services/api/clients'
import { TClient } from '../shared/types'

export const ManageClients = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down(700))
  const hdDown = useMediaQuery(theme.breakpoints.down(1280))
  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false)
  const [clients, setClients] = useState<TClient[]>([])
  const [selectedClient, setSelectedClient] = useState<TClient | null>(null)

  const fetchClients = useCallback(async () => {
    const result = await ClientsService.getAllClients()

    setIsLoading(false)

    if(result instanceof ResponseError ){
      showApiErrorAlert({message: result.message, alertBackground, alertColor})
      return
    }

    setClients(result)
  }, [])

  useEffect(() => {
    fetchClients()
  }, [theme])

  const selectClient = (id: string) => {
    const client = clients.find(client => client.id === id)

    if(!client) {
      return
    }

    setSelectedClient(client)
  }

  const handleClickButtonEdit = () => {
    if(selectedClient){
      navigate(`/gerenciar-clientes/${selectedClient.id}`)
      return
    }
    Swal.fire({
      titleText: 'Nenhum cliente selecionado',
      text: 'Selecione um cliente para editar',
      icon: 'error',
      background: alertBackground,
      color: alertColor
    })
  }

  const handleClickButtonDelete = useCallback(async () => {
    if(!selectedClient){
      Swal.fire({
        titleText: 'Nenhum cliente selecionado',
        text: 'Selecione um cliente para excluir',
        icon: 'error',
        background: alertBackground,
        color: alertColor
      })
      return
    }

    await Swal.fire({
      titleText: 'Tem certeza de que deseja excluir esse cliente?',
      text: 'Não será possível desfazer essa ação',
      icon: 'warning',
      background: alertBackground,
      color: alertColor,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'cancelar',
      confirmButtonText: 'Excluir'
    }).then(async (result) => {

      if(result.isConfirmed){

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const result = await ClientsService.deleteClient(selectedClient.id!)

        if(result instanceof Error){

          showApiErrorAlert({
            message: result.message,
            alertBackground,
            alertColor
          })
          return
        }
        setOpenSuccessAlert(true)
        fetchClients()
      }
    })
  },[selectedClient, theme])

  return(
    <BasePageLayout title='Gerenciar clientes' toolbar={
      <Toolbar
        showButtonNew
        showButtonEdit
        showButtonDelete
        showButtonExit

        onClickButtonNew={() => navigate('/gerenciar-clientes/novo')}
        onClickButtonEdit={handleClickButtonEdit}
        onClickButtonDelete={handleClickButtonDelete}
        onClickButtonExit={() => console.log('logout')}
      />
    }>
      <Snackbar open={openSuccessAlert} autoHideDuration={3000} onClose={() => setOpenSuccessAlert(false)}>
        <Alert onClose={() => setOpenSuccessAlert(false)} severity='success' sx={{ width: '100%' }}>
          Cliente excluído com sucesso
        </Alert>
      </Snackbar>

      {isLoading && <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress/>
      </Box>}

      {!isLoading && clients.length == 0 && <Box display='flex' justifyContent='center' alignItems='center'>

        <Typography variant={smDown ? 'h6' : 'h5'}>
          Nenhum cliente encontrado
        </Typography>
      </Box>}

      <Box display='flex' flexDirection={mdDown ? 'column' : 'row'}
        gap={hdDown ? 1 : 5}
        padding={1}
        alignContent='center'
      >

        {!isLoading && clients.length > 0 && <>
          <Box padding={smDown ? 2 : 5} display='flex' flexDirection='column' alignItems='center' >
            <Typography variant={smDown ? 'h5' : 'h4'} paddingBottom={3}>
            Clientes
            </Typography>

            <List component={Paper}
              sx={{
                overflow: 'auto',
                maxHeight: mdDown ? 250 : 600,
              }}
            >
              {clients.length > 0 && clients.map(client => {
                return (
                  <ClientListItem
                    selected={client.id === selectedClient?.id}
                    key={client.id}
                    client={client}
                    onClickCLientListItem={selectClient}
                  />
                )
              })}

            </List>

          </Box>
          <Box padding={smDown ? 2 : 5} display='flex' alignItems='center' flexDirection='column' >

            {selectedClient && <Typography paddingBottom={3}
              variant={smDown ? 'h5' : 'h4'}>
            Cliente selecionado
            </Typography>}

            {selectedClient && <ClientCard selectedClient={selectedClient} />}

            {!selectedClient && <Typography variant={smDown ? 'h6' : 'h5'}>
              Nenhum cliente selecionado
            </Typography>}

          </Box>
        </>}
      </Box>

    </BasePageLayout>
  )
}