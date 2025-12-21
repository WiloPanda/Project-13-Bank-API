import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AuthApi } from "@/Services/authApi";
import { setToken } from '@/App/Slices/authReducer'

const Form = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, token } = useSelector((state) => state.Auth)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await AuthApi.loginApi(email, password);
            dispatch(setToken(data.body.token));
            navigate("/profile");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isSuccess && token) {
            navigate("/profile");
        }
    }, [isSuccess, token, navigate]);

    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>

                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text"
                        id="username"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me" name="rememberMe">Remember me</label>
                </div>

                {isLoading && <p>Connexion en cours…</p>}
                {isError && <p className="error">{isError || 'Erreur de connexion'}</p>}

                <button type="submit" className="sign-in-button">Sign In</button>
            </form>
        </section>
    )
}

export default Form
