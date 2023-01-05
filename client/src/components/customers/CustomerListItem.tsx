import { Box,  ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import { useCallback } from 'react'

import { TCustomer } from '../../shared/types'

type TCustomerListItemProps = {
  customer: TCustomer,
  selected: boolean,
  onClickCustomerListItem: (id: string) => void
}
export const CustomerListItem: React.FC<TCustomerListItemProps> = ({customer, onClickCustomerListItem, selected}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const handleOnClickListItem = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onClickCustomerListItem(customer.id!)
  },[])

  return(
    <ListItemButton onClick={handleOnClickListItem}
      selected={selected}
    >

      <Box gap={2} padding={1} maxWidth={smDown ? 150 : mdDown ? 300 : 400}>

        <ListItemText primaryTypographyProps={{ style: {
          minWidth: 150,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        } }} primary={customer.name}/>
      </Box>
    </ListItemButton>
  )
}