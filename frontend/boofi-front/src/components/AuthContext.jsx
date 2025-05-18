import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, clearToken } from '../Auth.jsx';
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(!!getToken());
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    const login = (token) => {
        saveToken(token);
        setIsAuth(true);
        navigate("/");
    };

    const logout = () => {
        clearToken();
        setIsAuth(false);
        setUserRole(null);
        navigate("/auth/register");
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            fetch('http://localhost:8080/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    // Получаем полную информацию о пользователе
                    return fetch(`http://localhost:8080/users/${data.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                }
            })
            .then(response => response.json())
            .then(userData => {
                if (userData && userData.role) {
                    setUserRole(userData.role);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                logout();
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);