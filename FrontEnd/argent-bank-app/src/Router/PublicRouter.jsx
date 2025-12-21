import React, { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import PrivateRoute from '@/Pages/Private/PrivateRoute'

// Lazy loading des composants
const Layout = lazy(() => import('@/Layout/Layout'))
const Profile = lazy(() => import('@/Pages/Private/Profile'))
const Home = lazy(() => import('@/Pages/Public/Home'))
const Login = lazy(() => import('@/Pages/Public/Login'))

const publicRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace />,
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: 'profile',
                        element: <Profile />,
                    },
                ],
            },
        ],
    },
])

export default publicRouter
