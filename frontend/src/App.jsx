import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Auth from './components/auth/auth'
import Splash from './components/splash/splash'
import Layout from './components/layout/layout'
const router = createBrowserRouter( [
  {path: '*', element: <Splash />},
  {path: `/`, element: <Splash />},
  {path: '/login', element: <Auth type={'login'} />},
  {path: '/register', element: <Auth type={'register'} />},
  {path: '/channels', children: [
    { index: true, element: <Splash /> }, 
    { path: '@me', element: <Layout type='@me'/> },
    { path: ':serverId', element: <Outlet />, children: [
        {path: ':channelId', element: <Layout type='channel' />}
    ]}
  ]}
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
