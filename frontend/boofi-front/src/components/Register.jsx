import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveToken } from "../Auth";

function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        try {
            const resp = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",  // если вы всё-таки храните в куках, иначе опустите
                body: JSON.stringify(form),
            });

            const text = await resp.text();           // читаем как текст
            if (!resp.ok) throw new Error(text || `Ошибка ${resp.status}`);

            const { token } = JSON.parse(text);       // парсим только если OK
            saveToken(token);                         // сохраняем в localStorage
            navigate("/");                            // редирект после успешной регистрации

        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                {error && <p style={{color: "red"}}>{error}</p>}
                <input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Почта"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Зарегистрироваться</button>

                <h2>
                    <p>Уже зарегистрированы?</p>
                    <Link to={"/auth/login"}><p>Войдите в свой аккаунт</p></Link>
                </h2>
            </form>
        </div>
    );
}

export default Register;
