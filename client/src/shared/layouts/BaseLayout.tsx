import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useDrawerContext } from '../contexts'

interface IBasePageLayoutProps{
  children: React.ReactNode
  title: string
  toolbar?: React.ReactNode
}

export const BasePageLayout: React.FC<IBasePageLayoutProps> = ({children, title, toolbar}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down(1000))
  const { toggleDrawerOpen } = useDrawerContext()


  return(
    <Box height='100%' display='flex' flexDirection='column' gap={1}>

      <Box padding={1} height={theme.spacing(mdDown ? 6 : 8)} display='flex' alignItems='center' gap={1}>

        {mdDown && <IconButton onClick={toggleDrawerOpen}>
          <Icon>menu</Icon>
        </IconButton>}

        <Typography
          paddingLeft={theme.spacing(smDown ? 4 : 6)}
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='elipses'
          variant='h4'
        >
          {title}
        </Typography>

      </Box>

      {toolbar && <Box>
        {toolbar}
      </Box>}

      <Box flex={1} overflow='auto' justifyContent='center' display='flex'>
        {children}
      </Box>

    </Box>
  )
}