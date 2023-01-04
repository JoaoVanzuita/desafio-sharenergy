import { Box, CircularProgress, List, Pagination, Paper, Typography, useMediaQuery, useTheme} from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Toolbar } from '../components'
import { UserListItem } from '../components/users/UserListItem'
import { useAuthContext } from '../shared/contexts'
import { showApiErrorAlert } from '../shared/functions'
import { BasePageLayout } from '../shared/layouts/BaseLayout'
import { ResponseError } from '../shared/services/api/axios-config/errors'
import { RandomUsersService } from '../shared/services/api/random-users'
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
  const { signout } = useAuthContext()

  useEffect(() => {
    searchParams.set('page', '1')
    searchParams.set('results', hdDown ? '4' : '6')
    setSearchParams(searchParams)
  }, [hdDown])

  const page = useMemo(() => {
    return searchParams.get('page') || '1'
  }, [searchParams])

  const results = useMemo(() => {
    return searchParams.get('results') || '4'
  },[searchParams])

  const filteredUsers: TRandomUser[] = search.length > 0
    ? users.filter(user => {
      return (
        user.name.includes(search) ||
        user.username.includes(search) ||
        user.email.includes(search)
      )
    })
    : users

  const fetchUsers = useCallback(async(page: number, results: number) => {

    const result = await RandomUsersService.getRandomUsers(page, results)

    setIsLoading(false)

    if(result instanceof ResponseError ){
      showApiErrorAlert({message: result.message, alertBackground, alertColor})
      return
    }

    setUsers(result)
  },[searchParams])

  useEffect(() => {
    fetchUsers(Number(page), Number(results))
  },[page, results])

  const handleLogout = useCallback(() => {
    signout().then(result => {
      if(!result) return

      showApiErrorAlert({message: result.message, alertBackground, alertColor})
    })
  }, [theme])

  return(
    <BasePageLayout title='Random users' toolbar={<Toolbar
      textSearch={search}
      showSearchInput
      showButtonExit

      onClickButtonExit={handleLogout}
      onChangeTextSearch={text => setSearch(text) }
    />}
    >
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>

        {isLoading && <CircularProgress/>}

        <List component={Paper}>
          {filteredUsers.length > 0 && filteredUsers.map(user => {
            return <UserListItem key={user.id} user={user}/>
          })}
        </List>

        {!isLoading && filteredUsers.length > 0 &&
          <Box paddingTop={2}>
            <Pagination page={Number(page)}
              count={Math.ceil(5000 / Number(results))}
              onChange={(_, newPage) => {
                searchParams.set('page', newPage.toString())
                setSearchParams(searchParams)
                setSearch('')
              }}
            />
          </Box>
        }

        {!isLoading && !filteredUsers.length &&
          <Typography variant='h5'>
            Nenhum usuário encontrado
          </Typography>
        }
      </Box>

    </BasePageLayout>
  )
}