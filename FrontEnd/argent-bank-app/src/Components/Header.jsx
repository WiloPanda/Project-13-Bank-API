import React, { useEffect } from 'react'
import LogoArgentBank from '@/Assets/Logo/argentBankLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { AuthApi } from '@/Services/authApi'
import { userSelector } from '@/App/Selector/userSelector'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { firstName } = useSelector(userSelector)

    let logout = () => {
        AuthApi.logout()
        dispatch({ type: "Auth/logout" })
        dispatch({ type: "User/setUserProfile", payload: { firstName: '', lastName: '' } })
        navigate('/home')
    }

    useEffect(() => {
        const token = AuthApi.getToken()

        if (token) {
            AuthApi.getProfileApi(token)
                .then((res) => {
                    dispatch({
                        type: "User/setUserProfile",
                        payload: {
                            firstName: res.body.firstName,
                            lastName: res.body.lastName,
                        },
                    })
                })
                .catch(() => {
                    AuthApi.logout()
                })
        }
    }, [dispatch])

    return (
        <header>
            <nav className="main-nav">
                <NavLink className="main-nav-logo" to="/home">
                    <img
                        className="main-nav-logo-image"
                        src={LogoArgentBank}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                <div>
                    {AuthApi.isLogged() ? (
                        <>
                            <NavLink to="/profile" className="main-nav-item">
                                <i className="header-icon fa fa-user-circle"></i>
                                {firstName}
                            </NavLink>
                            <NavLink className="main-nav-item" onClick={logout}>
                                <i className="header-icon fa fa-sign-out"></i>
                                Sign Out
                            </NavLink>
                        </>
                    ) : (
                        <NavLink to="/login" className="main-nav-item">
                            <i className="header-icon fa fa-user-circle"></i>
                            Sign In
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    )
}


export default Header
