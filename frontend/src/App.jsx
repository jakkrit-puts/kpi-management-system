import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import { AppData } from './context/AppContext'
import Loading from './components/Loading'
import Dashboard from './pages/Dashboard'
import User from './pages/admin/User'
import KPI from './pages/admin/KPI'
import Notfound from './pages/Notfound'
import UserKPI from './pages/user/UserKPI'

export const server = import.meta.env.VITE_API_URL;

export default function App() {

  const { isAuth, loading } = AppData()

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path='/' element={isAuth ? <Dashboard /> : <Login />}></Route>
              <Route path='/login' element={isAuth ? <Dashboard /> : <Login />}></Route>
              <Route path='/dashboard' element={isAuth ? <Dashboard /> : <Login />}></Route>
              <Route path='/user' element={isAuth ? <User /> : <Login />}></Route>
              <Route path='/kpi' element={isAuth ? <KPI /> : <Login />}></Route>

              <Route path='/user/kpi' element={isAuth ? <UserKPI /> : <Login />}></Route>

              <Route path="*" element={<Notfound />} />
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        )
      }
    </>
  )
}
