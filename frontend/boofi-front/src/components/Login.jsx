import React, {useState} from "react";
import {Link} from "react-router";
import {useAuth} from "./AuthContext.jsx";

function Login() {
    const { login } = useAuth();

    const [form, setForm] = useState({
            email: "",
            password: ""
        }
    );
    const [error, setError] = useState(null);

    const handleChange = e => {
        setForm(f => ({
            ...f, [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(form),
                credentials: "include"
            });

            const text = await response.text();

            if (!response.ok) {
                throw new Error(text || `Ошибка ${response.status}`);
            }

            const {token} = await JSON.parse(text);
            login(token);

        } catch (err) {
            setError(err.message)
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Вход</h2>
                {error && <p style={{color: "red"}}>{error}</p>}
                <input
                    type="email"
                    placeholder="Почта"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    value={form.password}
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