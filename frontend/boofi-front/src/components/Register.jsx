import React, { useState } from "react";
import "../styles/Register.css";
import {Link} from "react-router";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Ошибка при регистрации");
            }

            const data = await response.json();
            console.log("Успешная регистрация:", data);

            // Перенаправление на страницу логина, например:
            window.location.href = "/login";

        } catch (error) {
            console.error("Ошибка:", error.message);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Регистрация</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

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

                <button type="submit">Зарегистрироваться</button>

                <h2>
                    <p>Уже зарегистрированы?</p>
                    <Link to={"/login"}><p>Войдите в свой аккаунт</p></Link>
                </h2>
            </form>
        </div>
    );
}

export default Register;
