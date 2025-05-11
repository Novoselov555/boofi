import React, {useState} from "react";
import {Link, useNavigate} from "react-router";
import {saveToken} from "../Auth.jsx";
import "../styles/Form.css"

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
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
            const response = await fetch("http://localhost:8080/auth/register", {
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
        } catch(err) {
            setError(err.message);
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
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

                <button type="submit">Зарегистрироваться</button>
                <h2>
                    <p>Уже зарегистрированы?</p>
                    <Link to={"auth/login"}>
                        <p>Войдите в свой аккаунт</p>
                    </Link>
                </h2>
            </form>
        </div>
    );
}

export default Register;