import { useState } from 'react'

import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Auth from './components/auth/auth'
import Splash from './components/splash/splash'
import Layout from './components/layout/layout'
const router = createBrowserRouter( [
  {path: `/`, element: <Splash />},
  {path: '/login', element: <Auth type={'login'} />},
  {path: '/register', element: <Auth type={'register'} />},
  {path: '/channels', element: <Layout />, children: [
    {path: ':serverId', element: <h1>I'm the server outlet</h1>, children: [
      {path: ':channelId', element: <h1>I'm the channel outlet</h1> }
    ]}
  ] }
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
