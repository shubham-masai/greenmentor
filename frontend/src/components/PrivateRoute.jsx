import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const token = localStorage.getItem("token") || null
    return (
        token ? children : <Navigate to={"/login"} />
    )
}

export default PrivateRoute