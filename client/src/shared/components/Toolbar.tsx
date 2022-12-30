import { Box, Button, Icon, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'

interface IToolbarProps {
  textSearch?:string

  showSearchInput?:boolean
  showButtonNew?: boolean
  showButtonSave?: boolean
  showButtonDelete?: boolean
  showButtonEdit?: boolean
  showButtonExit?: boolean
  showButtonBack?: boolean

  onChangeTextSearch?: (newText: string) => void
  onClickButtonNew?: () => void
  onClickButtonSave?: () => void
  onClickButtonEdit?: () => void
  onClickButtonDelete?: () => void
  onClickButtonExit?: () => void
  onClickButtonBack?: () => void
}

export const Toolbar: React.FC<IToolbarProps> = ({
  textSearch,

  showSearchInput = false,
  showButtonNew = false,
  showButtonSave = false,
  showButtonEdit = false,
  showButtonDelete = false,
  showButtonExit = false,
  showButtonBack = false,

  onChangeTextSearch,
  onClickButtonNew,
  onClickButtonSave,
  onClickButtonEdit,
  onClickButtonDelete,
  onClickButtonExit,
  onClickButtonBack

}) => {
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))

  return(
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      gap={1}
      alignItems='center'
      justifyContent='space-between'
      component={Paper}
    >

      <Box
        display='flex'
        gap={1}
        alignItems='center'
      >
        {showSearchInput && <TextField
          size='small'
          label={'Pesquisar'}
          value={textSearch}
          onChange={ev => onChangeTextSearch?.(ev.currentTarget.value)}
        />}

        {showButtonNew && <Button variant='contained'
          color='primary'
          onClick={onClickButtonNew}
          disableElevation
          startIcon={<Icon>add</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            novo
          </Typography>

        </Button>}

        {showButtonSave && <Button variant='contained'
          color='primary'
          onClick={onClickButtonNew}
          disableElevation
          startIcon={<Icon>save</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            salvar
          </Typography>

        </Button>}

        {showButtonEdit && <Button variant='contained'
          color='primary'
          onClick={onClickButtonEdit}
          disableElevation
          startIcon={<Icon>edit</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            editar
          </Typography>

        </Button>}

        {showButtonDelete && <Button variant='outlined'
          color='primary'
          onClick={onClickButtonDelete}
          disableElevation
          startIcon={<Icon>delete</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Excluir
          </Typography>

        </Button>}

      </Box>

      <Box
        display='flex'
        gap={1}
        alignItems='center'
      >

        {smUp && showButtonExit && <Button variant='outlined'
          color='primary'
          onClick={onClickButtonExit}
          disableElevation
          startIcon={<Icon>logout</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            sair
          </Typography>

        </Button>}

        {smUp && showButtonBack && <Button variant='outlined'
          color='primary'
          onClick={onClickButtonBack}
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            voltar
          </Typography>

        </Button>}

      </Box>

    </Box>
  )
}