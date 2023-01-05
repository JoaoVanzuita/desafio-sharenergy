import { Box, Card, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'

import { TCustomer } from '../../shared/types'

type TCustomerCardProps = {
  selectedCustomer: TCustomer
}

export const CustomerCard: React.FC<TCustomerCardProps> = ({selectedCustomer}) => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down(450))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Card>
      <Box display='flex' flexDirection='row'
        gap={smDown ? 1 : 2}
        padding={smDown ? 1 : 2}
      >
        <Box display='flex' flexDirection='column'
          maxWidth={mobile ? 150 : mdDown ? 200 : 250}
        >

          <Typography alignSelf='center' paddingBottom={2}
            variant={mdDown ? 'h6' : 'h5'}
          >
            Informações
          </Typography>

          <Typography whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'
            variant={mdDown ? 'body2' : 'body1'}
            paddingBottom={2}
          >
            Nome: {selectedCustomer.name}
          </Typography>

          <Typography whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'
            variant={mdDown ? 'body2' : 'body1'}
            paddingBottom={2}
          >
            Email: {selectedCustomer.email}
          </Typography>

          <Typography whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'
            variant={mdDown ? 'body2' : 'body1'}
            paddingBottom={2}
          >
            Telefone: {selectedCustomer.phone}
          </Typography>

          <Typography whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'
            variant={mdDown ? 'body2' : 'body1'}
          >
            CPF: {selectedCustomer.cpf}
          </Typography>

        </Box>

        <Divider orientation='vertical' flexItem/>

        <Box display='flex' flexDirection='column'
          maxWidth={mobile ? 150 : mdDown ? 200 : 250}
        >
          <Typography alignSelf='center' paddingBottom={2}
            variant={mdDown ? 'h6' : 'h5'}
          >
            Endereço
          </Typography>

          <Typography whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'
            variant={mdDown ? 'body2' : 'body1'}
            paddingBottom={3}
          >
            Cidade: {selectedCustomer.address.city}
          </Typography>

          <Typography whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'
            variant={mdDown ? 'body2' : 'body1'}
            paddingBottom={3}
          >
            Rua: {selectedCustomer.address.street}
          </Typography>

          <Typography whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'
            variant={mdDown ? 'body2' : 'body1'}
          >
            Número: {selectedCustomer.address.number}
          </Typography>

        </Box>
      </Box>
    </Card>
  )
}