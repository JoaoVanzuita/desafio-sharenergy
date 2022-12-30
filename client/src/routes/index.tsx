import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { GetHttpCat, GetRandomDog, ManageClients, RandomUsers, SaveClient } from '../pages'
import { useDrawerContext } from '../shared/contexts'

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'question_mark',
        path: '/random-users',
        label: 'Random users'
      },
      {
        icon: 'http',
        path: '/http-cat',
        label: 'HTTP Cats'
      },
      {
        icon: 'pets',
        path: '/random-dog',
        label: 'Random Dog'
      },
      {
        icon: 'people',
        path: '/gerenciar-clientes',
        label: 'Gerenciar Clientes'
      }
    ])
  }, [])

  return(
    <Routes>
      <Route path='/random-users' element={<RandomUsers/>}/>
      <Route path='/http-cat' element={<GetHttpCat/>}/>
      <Route path='/random-dog' element={<GetRandomDog/>}/>
      <Route path='/gerenciar-clientes' element={<ManageClients/>}/>
      <Route path='/gerenciar-clientes/:id' element={<SaveClient/>}/>
      <Route path='*' element={<Navigate to={'/random-users'} />}/>
    </Routes>
  )
}
