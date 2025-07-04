import React from 'react'
import LOCALSTORAGE_KEYS from '../../constants/localStorage'
import { Navigate, Outlet } from 'react-router-dom'

const AuthProtectRoute = () => {
    const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.authorizationToken)
    if (auth_token) {
        //Voy a la siguiente ruta
        return <Outlet /> //outlet voy 
    }
    else {
        return <Navigate to={'/login'} />
    }
}

export default AuthProtectRoute