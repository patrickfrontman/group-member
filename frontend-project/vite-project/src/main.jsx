import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'
import Home from './Home.jsx'
import Employee from './Employee.jsx'
import Department from './Department.jsx'
import Salary from './Salary.jsx'
import Report from './Report.jsx'

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
      <Route path='department' element={<Department/>}/>
      <Route path='employee' element={<Employee/>}/>
      <Route path='salary' element={<Salary/>}/>
      <Route path='report' element={<Report/>}/>
    </Route>
    </>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)