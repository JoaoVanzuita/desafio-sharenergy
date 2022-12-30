import { Box, CircularProgress, List, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ClientCard, ClientListItem, Toolbar } from '../shared/components'
import { showApiErrorAlert } from '../shared/functions'
import { BasePageLayout } from '../shared/layouts/BaseLayout'
import { clientsApi } from '../shared/services/api/clients'
import { TClient } from '../shared/types'

export const ManageClients = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const lgDown = useMediaQuery(theme.breakpoints.down(700))
  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [clients, setClients] = useState<TClient[]>([])
  const [selectedClient, setSelectedClient] = useState<TClient | null>(null)

  const fetchClients = useCallback(async () => {
    const result = await clientsApi.getAllClients()

    setIsLoading(false)

    if(result instanceof Error ){
      showApiErrorAlert({message: result.message, alertBackground, alertColor})
      return
    }

    setClients(result)
  }, [])

  useEffect(() => {
    fetchClients()
  }, [theme])

  const selectClient = (id: string) => {
    const client = clients.find(client => client._id === id)

    if(!client) {
      return
    }

    setSelectedClient(client)
  }

  const handleClickButtonEdit = () => {
    if(selectedClient){
      navigate(`/gerenciar-clientes/${selectedClient._id}`)
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

        const result = await clientsApi.deleteClient(selectedClient._id!)

        if(result instanceof Error){

          showApiErrorAlert({
            message: result.message,
            alertBackground,
            alertColor
          })
          return
        }
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
        onClickButtonExit={() => console.log('exit')}
      />
    }
    >
      {isLoading && <Box display='flex' justifyContent='center' alignItems='center'>

        <CircularProgress/>
      </Box>}

      <Box display='flex' flexDirection={lgDown ? 'column' : 'row'}
        gap={mdDown ? 1 : 5}
        padding={1}
        alignContent='center'
      >

        {!isLoading && <>
          <Box padding={smDown ? 2 : 5} display='flex' flexDirection='column' alignItems='center' order={lgDown ? 2 : 1}>
            <Typography variant={smDown ? 'h5' : 'h4'} paddingBottom={3}>
            Clientes
            </Typography>


            <List component={Paper}>
              {clients.length > 0 && clients.map(client => {
                return (
                  <ClientListItem
                    key={client._id}
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    client={client}
                    onClickCLientListItem={selectClient}
                  />
                )
              })}

            </List>

          </Box>
          <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' order={lgDown ? 1 : 2}>

            {selectedClient && <Typography paddingBottom={3}
              variant={smDown ? 'h6' : 'h5'}>
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