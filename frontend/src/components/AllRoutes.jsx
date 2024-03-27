import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
    )
}

export default AllRoutes