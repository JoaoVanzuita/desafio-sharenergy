import { Alert, Box, CircularProgress, Paper, Snackbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'

import { Toolbar } from '../components'
import { BasePageLayout } from '../shared/layouts/BaseLayout'
import { ResponseError } from '../shared/services/api/axios-config/errors'
import { RandomDogsService } from '../shared/services/api/random-dogs'
import { TRandomDogResponse } from '../shared/types'

export const GetRandomDog = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const [imageData, setImageData] = useState<TRandomDogResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleNewDog = async () => {
    setImageData(null)
    setIsLoading(true)
    await RandomDogsService.getRandomDog().then(result => {
      setIsLoading(false)

      if(result instanceof ResponseError){
        alert(result.message)
        return
      }

      setImageData(result)
    })
  }

  return(
    <BasePageLayout title='Random Dogs' toolbar={<Toolbar
      showButtonExit
      showButtonNew
      textButtonNew='novo dog'

      onClickButtonNew={handleNewDog}
    />}>

      <Snackbar open={errorMessage.length > 0} autoHideDuration={3000} onClose={() => setErrorMessage('')}>
        <Alert onClose={() => setErrorMessage('')} severity='error' sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Box display='flex' alignItems='center'>

        {!isLoading && !imageData &&
          <Typography variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'} textAlign='center'>
          Gosta de cachorros? <br/>
          Clique no botão
          </Typography>
        }

        {isLoading && <CircularProgress/>}

        {imageData &&
        <Box padding={3} component={Paper}
        >
          {imageData.mediaType.includes('image') &&
            <img src={imageData.url}
              style={{
                maxHeight: smDown ? 300 : mdDown ? 400 : 500,
                maxWidth: smDown ? 300 : mdDown ? 400 : 500
              }}
            />}
          {imageData.mediaType.includes('video') &&
            <video autoPlay muted loop
              style={{
                maxHeight: smDown ? 300 : mdDown ? 400 : 500,
                maxWidth: smDown ? 300 : mdDown ? 400 : 500
              }}
            >
              <source src={imageData.url}/>
            </video>
          }
        </Box>}

      </Box>

    </BasePageLayout>
  )
}