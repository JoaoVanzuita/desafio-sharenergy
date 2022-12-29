import { Avatar, Box, ListItem, ListItemAvatar, Typography, useMediaQuery, useTheme } from '@mui/material'

type TUserCardProps = {
  user: {
    name: {
      first: string
      last: string
      },
      email: string
      login: {
        uuid: string
        username: string

      },
      dob: {
        age: number
      },
      picture: {
        large: string
        medium: string
        thumbnail: string
      }
  }
}

export const UserCard: React.FC<TUserCardProps> = ({user}) => {
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
          src={user.picture.large}/>
        </ListItemAvatar>

        <Box display='flex' flexDirection='column' width='100%' >

          <Box display='flex'  justifyContent='space-between'>

            <Typography>
              {user.name.first} {user.name.last}
            </Typography>
            <Typography>
              {user.dob.age} anos
            </Typography>

          </Box>

          <Box display='flex' flexDirection='column' gap={1}>

            <Typography>
              {user.login.username}
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