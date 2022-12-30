import { Box, CircularProgress, List, Pagination, Paper, Typography, useMediaQuery, useTheme} from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Toolbar } from '../shared/components'
import { UserListItem } from '../shared/components/UserListItem'
import { showApiErrorAlert } from '../shared/functions'
import { BasePageLayout } from '../shared/layouts/BaseLayout'
import { randomUsersApi } from '../shared/services/api/random-users'
import { TRandomUser } from '../shared/types'

export const RandomUsers = () => {
  const theme = useTheme()
  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
  const hdDown = useMediaQuery(theme.breakpoints.down(1366))

  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<TRandomUser[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')

  useEffect(() => {
    searchParams.set('page', '1')
    searchParams.set('limit', hdDown ? '4' : '6')
    setSearchParams(searchParams)
  }, [])

  const page = useMemo(() => {
    return searchParams.get('page') || '10'
  }, [searchParams])

  const limit = useMemo(() => {
    return searchParams.get('limit') || '1'
  },[searchParams])

  const filteredUsers: TRandomUser[] = search.length > 0
    ? users.filter(user => {
      return (
        user.name.first.includes(search) ||
        user.name.last.includes(search) ||
        user.login.username.includes(search) ||
        user.email.includes(search)
      )
    })
    : users

  const fetchUsers = useCallback(async(page: number, limit: number) => {

    const result = await randomUsersApi.getRandomUsers(page, limit)

    setIsLoading(false)

    if(result instanceof Error ){
      showApiErrorAlert({message: result.message, alertBackground, alertColor})
      return
    }

    setUsers(result)
  },[])

  useEffect(() => {
    fetchUsers(Number(page), Number(limit))
  },[page, limit])

  return(
    <BasePageLayout title='Random users' toolbar={<Toolbar
      textSearch={search}
      showSearchInput
      showButtonExit
      onChangeTextSearch={text => setSearch(text) }
    />}
    >
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>

        {isLoading && <CircularProgress/>}

        <List component={Paper}>
          {filteredUsers.length > 0 && filteredUsers.map(user => {
            return <UserListItem key={user.login.uuid} user={user}/>
          })}
        </List>

        {!isLoading && filteredUsers.length > 0 && <Pagination page={Number(page)}
          onChange={(ev, newPage) => {
            searchParams.set('page', newPage.toString())
            setSearchParams(searchParams)
            setSearch('')
          }} count={Math.ceil(5000 / Number(limit))}/>}

        {!isLoading && !filteredUsers.length &&
          <Typography variant='h5'>
            Nenhum usuário encontrado
          </Typography>
        }
      </Box>

    </BasePageLayout>
  )
}