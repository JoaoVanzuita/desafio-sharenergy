import { Alert, Box, CircularProgress, Paper, Snackbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useCallback, useState } from 'react'

import { Toolbar } from '../components'
import { numberMaskInput } from '../shared/functions'
import { useDebounce } from '../shared/hooks'
import { BasePageLayout } from '../shared/layouts/BaseLayout'
import { ResponseError } from '../shared/services/api/axios-config/errors'
import { HttpCatService } from '../shared/services/api/http-cat'

export const GetHttpCat = () => {
  const { debounce } = useDebounce(300)
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const getHttpCat = useCallback((statusCode: string) => {
    HttpCatService.getHttpCat(statusCode).then(result => {

      if(result instanceof ResponseError){

        setErrorMessage(`Erro ${result.statusCode} - ${result.message}`)

        setImageUrl('/not_found.jpg')
        setIsLoading(false)
        return
      }

      setIsLoading(false)
      setImageUrl(result)
    })
  },[])

  const searchCat = useCallback((search: string) => {

    debounce(() => {
      setImageUrl('')

      if(search.length < 3) return

      setIsLoading(true)
      getHttpCat(search)
    })
  }, [])

  return(
    <BasePageLayout title='HTTP Cats' toolbar={<Toolbar
      showButtonExit
      showSearchInput

      onKeyDownTextSearch={ev => numberMaskInput(ev)}
      onChangeTextSearch={searchText => searchCat(searchText)}
    />}>

      <Snackbar open={errorMessage.length > 0} autoHideDuration={3000} onClose={() => setErrorMessage('')}>
        <Alert onClose={() => setErrorMessage('')} severity='error' sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Box display='flex' alignItems='center'>

        {!isLoading && !imageUrl &&
        <Typography variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'} textAlign='center'>
        Quer ver um gato aleatório da api Http Cats? <br/>
        Pesquise um código de status HTTP
        </Typography>
        }

        {isLoading && <CircularProgress/>}

        {imageUrl &&
        <Box padding={3} component={Paper}>
          <img src={imageUrl}
            width={smDown ? 300 : mdDown ? 400 : 500}
            height={smDown ? 300 : mdDown ? 400 : 500}
          />
        </Box>
        }

      </Box>

    </BasePageLayout>
  )
}