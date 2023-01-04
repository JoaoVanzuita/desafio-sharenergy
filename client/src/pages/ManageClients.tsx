import { Alert, Box, CircularProgress, List, Pagination, Paper, Snackbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import { ClientCard, ClientListItem, Toolbar } from '../components'
import { useAuthContext } from '../shared/contexts'
import { showApiErrorAlert } from '../shared/functions'
import { useDebounce } from '../shared/hooks'
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
  const { signout } = useAuthContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce(1000)

  const [isLoading, setIsLoading] = useState(true)
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false)
  const [clients, setClients] = useState<TClient[]>([])
  const [selectedClient, setSelectedClient] = useState<TClient | null>(null)
  const [ total, setTotal ] = useState(0)

  useEffect(() => {
    searchParams.set('page', '1')
    searchParams.set('results',  smDown ? '4' : hdDown ? '6' : '8')
    searchParams.set('name', '')
    setSearchParams(searchParams)
  }, [smDown, hdDown])

  const page = useMemo(() => {
    return searchParams.get('page') || '1'
  }, [searchParams])

  const results = useMemo(() => {
    return searchParams.get('results') || '4'
  },[searchParams])

  const nameSearch = useMemo(() => {
    return searchParams.get('name') || ''
  },[searchParams])

  const fetchClients = useCallback(async (nameSearch:string, page:number, results:number) => {
    const result = await ClientsService.getClients(nameSearch, page, results)

    setIsLoading(false)

    if(result instanceof ResponseError ){
      showApiErrorAlert({message: result.message, alertBackground, alertColor})
      return
    }

    setClients(result.clients)
    setTotal(result.total)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    debounce(() => {
      fetchClients(nameSearch, Number(page), Number(results))
    })
  }, [theme, searchParams])

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
          showApiErrorAlert({ message: result.message, alertBackground, alertColor })
          return
        }
        setOpenSuccessAlert(true)
        fetchClients(nameSearch, Number(page), Number(results))
      }
    })
  },[selectedClient, theme, searchParams])

  const handleLogout = useCallback(() => {
    signout().then(result => {
      if(!result) return

      showApiErrorAlert({message: result.message, alertBackground, alertColor})
    })
  }, [theme])

  return(
    <BasePageLayout title='Gerenciar clientes' toolbar={
      <Toolbar
        showSearchInput
        responsiveSearchInput
        showButtonNew
        showButtonEdit
        showButtonDelete
        showButtonExit

        onChangeTextSearch={text => {
          searchParams.set('name', text)
          setSearchParams(searchParams)
        }}
        onClickButtonNew={() => navigate('/gerenciar-clientes/novo')}
        onClickButtonEdit={handleClickButtonEdit}
        onClickButtonDelete={handleClickButtonDelete}
        onClickButtonExit={handleLogout}
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
            <Box paddingTop={2}>
              <Pagination page={Number(page)}
                count={Math.ceil(total / Number(results))}
                onChange={(_, newPage) => {
                  searchParams.set('page', newPage.toString())
                  setSearchParams(searchParams)
                }}
              />
            </Box>

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