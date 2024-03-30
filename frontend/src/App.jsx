import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Auth from './components/auth'
const router = createBrowserRouter( [
  {path: '/login', element: <Auth type={'login'} />},
  {path: '/register', element: <Auth type={'register'} />}
  //{path: '/register', element: <NewUserForm />}
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
