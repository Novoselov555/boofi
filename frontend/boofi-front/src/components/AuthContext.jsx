import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, clearToken } from '../Auth.jsx';
import {useNavigate} from "react-router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(!!getToken());
    const navigate = useNavigate();

    const login = (token) => {
        saveToken(token);
        setIsAuth(true);
        navigate("/");
    };
    const logout = () => {
        clearToken();
        setIsAuth(false);
        navigate("/auth/register");
    };

    useEffect(() => {
        setIsAuth(!!getToken());
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);