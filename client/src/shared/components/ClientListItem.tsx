import { Box,  ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import { useCallback } from 'react'
import { TClient } from '../types'

type TUserListItemProps = {
  client: TClient,
  onClickCLientListItem: (id: string) => void
}
export const ClientListItem: React.FC<TUserListItemProps> = ({client, onClickCLientListItem}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const handleOnClickListItem = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onClickCLientListItem(client._id!)
  },[])

  return(
    <ListItemButton onClick={handleOnClickListItem}>
      <Box gap={2} padding={1} maxWidth={smDown ? 150 : mdDown ? 300 : 400}>

        <ListItemText primaryTypographyProps={{ style: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        } }} primary={client.name}/>
      </Box>
    </ListItemButton>
  )
}