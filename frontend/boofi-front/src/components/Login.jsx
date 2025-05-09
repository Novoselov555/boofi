import React, {useState} from "react";
import "../styles/Register.css"
import {Link, useNavigate} from "react-router";
import {saveToken} from "../Auth.jsx";

function Login() {
    const [formData, setFormData] = useState({email: "", password: ""});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application.json"},
                body: JSON.stringify(formData),
                credentials: "include"
            });

            if (!response.ok) {
                const {message} = await response.json();
                throw new Error(message || "Ошибка при входе");
            }

            const {token} = await response.json();
            saveToken(token)
            navigate("/");

        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Вход</h2>
                {error && <p style={{color: "red"}}>{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Почта"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Войти</button>
                <h2>
                    <p>Нет аккаунта?</p>
                    <Link to="/auth/register">
                        <p>Зарегистрируйтесь</p>
                    </Link>
                </h2>
            </form>
        </div>
    );
}

export default Login;