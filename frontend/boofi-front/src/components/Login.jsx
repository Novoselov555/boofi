import React, {useState} from "react";
import {useNavigate, Link} from "react-router";
import {saveToken} from "../Auth.jsx";

function Login() {
    const [form, setForm] = useState({
            name: "",
            email: "",
            password: ""
        }
    );
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
            saveToken(token);
            navigate("/");

        } catch (err) {
            setError(err.message)
        }
    };

    return (
        <div className="form-container">
            <form className="form" onChange={handleSubmit}>
                <h2>Вход</h2>
                {error && <p style={{color: "red"}}>{error}</p>}
                <input
                    type="text"
                    placeholder="Имя"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
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