import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'
import Home from './Home.jsx'
import Sparepart from './Sparepart.jsx'
import Stockin from './Stockin.jsx'
import Stockout from './Stockout.jsx'

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

    <Route path="" element={<Login />}/>

    <Route path='/register' element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />}>

      <Route path="" element={<Home />} />
      <Route path='sparepart' element={<Sparepart/>}/>
      <Route path='stockin' element={<Stockin/>}/>
      <Route path='stockout' element={<Stockout/>}/>
    </Route>
    </>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)