import React from "react";
import { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    expiresIn: 0,
    login: (token) => {},
    logout: () => {}
})

export default AuthContext;

export const AuthContextProvider = (props) => {

    const initialUser = localStorage.getItem('token');

    const initialTime = localStorage.getItem('expiresIn');

    const [token,setToken] = useState(initialUser);

    const [expiresIn,setExpiresIn] = useState(initialTime);

    const isLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token.idToken);
        setExpiresIn(token.expiresIn);
        localStorage.setItem('token',token.idToken);
        localStorage.setItem('expiresIn',token.expiresIn);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
    }


    const authContext = {
        token: token,
        expiresIn: expiresIn,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return(
        <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
    )
}