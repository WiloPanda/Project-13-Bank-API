import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";

// Lazy loading des composants
const Layout = lazy(() => import('../Layout/Layout'));
const UserProfile = lazy(() => import('../Pages/Private/UserProfile'));
const Home = lazy(() => import('../Pages/Public/Home'));
const LogIn = lazy(() => import('../Pages/Public/LogIn'));

const publicRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace />
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "login",
                element: <LogIn />,
            },
            {
                path: "profile",
                element: <UserProfile />,
            }
        ]
    }
]);

export default publicRouter;