const BASE_URL = 'http://localhost:3001/api/v1'

async function loginApi(email, password) {
    const res = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
        const data = await res.json()
        saveToken(data.body.token)
        return data
    } else {
        const data = await res.json()
        throw new Error(data.message || 'Login failed')
    }
}

async function getProfileApi(token) {
    const res = await fetch(`${BASE_URL}/user/profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Profile load failed')
    return data
}

async function updateProfileApi(token, { firstName, lastName }) {
    const res = await fetch(`${BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Profile update failed')
    return data
}

let saveToken = (Token) => {
    localStorage.setItem('token', Token)
}

let getToken = () => {
    return localStorage.getItem('token')
}

let isLogged = () => {
    return !!getToken()
}

let logout = () => {
    localStorage.removeItem('token')
}

export const AuthApi = {
    loginApi,
    getProfileApi,
    updateProfileApi,
    saveToken,
    getToken,
    isLogged,
    logout,
};
