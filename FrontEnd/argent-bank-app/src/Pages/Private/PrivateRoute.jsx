import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const token = useSelector((state) => state.Auth.token)

    if (!token) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

export default PrivateRoute
