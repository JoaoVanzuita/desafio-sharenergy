import { Box, CircularProgress, List, Pagination, Paper, Typography, useMediaQuery, useTheme} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Toolbar } from '../shared/components'
import { UserCard } from '../shared/components/UserCard'
import { showErrorAlert } from '../shared/functions'
import { BasePageLayout } from '../shared/layouts/BaseLayout'
import { randomUsersApi } from '../shared/services/api/random-users'
import { TUser } from '../shared/types'

export const RandomUsers = () => {
  const theme = useTheme()
  const alertBackground = theme.palette.background.default
  const alertColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff'
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const [users, setUsers] = useState<TUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const filteredUsers: TUser[] = search.length > 0
    ? users.filter(user => {
      return (
        user.name.first.includes(search) ||
        user.name.last.includes(search) ||
        user.login.username.includes(search) ||
        user.email.includes(search)
      )
    })
    : users

  const fetchUsers = useCallback(async(page: number) => {
    const pageLimit = smDown ? 4 : 6
    const result = await randomUsersApi.getRandomUsers(page, pageLimit)

    setIsLoading(false)

    if(result instanceof Error ){
      showErrorAlert({message: result.message, alertBackground, alertColor})
      return
    }

    setUsers(result)
  },[])

  useEffect(() => {
    fetchUsers(page)
  },[page])

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
            return <UserCard key={user.login.uuid} user={user}/>
          })}
        </List>

        {!isLoading && filteredUsers.length > 0 && <Pagination page={page} onChange={(ev, newPage) => {
          setPage(newPage)
          setSearch('')
        }} count={100}/>}

        {!isLoading && !filteredUsers.length &&
          <Typography variant='h5'>
            Nenhum usuário encontrado
          </Typography>
        }
      </Box>

    </BasePageLayout>
  )
}