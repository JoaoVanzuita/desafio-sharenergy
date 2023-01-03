import { Avatar, Box, ListItem, ListItemAvatar, Typography, useMediaQuery, useTheme } from '@mui/material'

import { TRandomUser } from '../../shared/types'

type TUserListItemProps = {
  user: TRandomUser
}

export const UserListItem: React.FC<TUserListItemProps> = ({user}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return(
    <ListItem>
      <Box gap={2} padding={1} display='flex' width={smDown ? 300 : 400}>

        <ListItemAvatar>
          <Avatar sx={{
            height: smDown ? theme.spacing(6) : theme.spacing(10),
            width: smDown ? theme.spacing(6) : theme.spacing(10)
          }}
          src={user.picture}/>
        </ListItemAvatar>

        <Box display='flex' flexDirection='column' width='100%' >

          <Box display='flex'  justifyContent='space-between'>

            <Typography>
              {user.name}
            </Typography>
            <Typography>
              {user.age} anos
            </Typography>

          </Box>

          <Box display='flex' flexDirection='column' gap={1}>

            <Typography>
              {user.username}
            </Typography>
            <Typography>
              {user.email}
            </Typography>

          </Box>
        </Box>
      </Box>
    </ListItem>
  )
}