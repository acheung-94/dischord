import { useState } from 'react'

import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Auth from './components/auth'
import Splash from './components/splash/splash'

const router = createBrowserRouter( [
  {path: `/`, element: <Splash />},
  {path: '/login', element: <Auth type={'login'} />},
  {path: '/register', element: <Auth type={'register'} />}
  //{path: '/channels', children: [ /@me index true, /:serverId children:]}
])
// path /channels children: :serverId < children:channelId, @me < children: :channelId 

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
