import React, {useState} from "react";
import {getToken} from "../Auth.jsx";
import "../styles/Form.css"
import GetUserId from "./GetUserId.jsx";
import {useAuth} from "./AuthContext.jsx";

function Profile() {
    const {logout} = useAuth();
    const [form, setForm] = useState({name: "", email: "", password: ""});
    const [error, setError] = useState("");

    const handleChange = (e) => setForm(f => ({...f, [e.target.name]: e.target.value}));


    const handleDeleteUser = async e => {
        e.preventDefault();
        setError("");
        try {
            const token = getToken();
            const id = await GetUserId(token);

            const response = await fetch(`http://localhost:8080/users/${id}`, {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${token}`}
            });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}`);
            }

            console.log(`Пользователь с id ${id} удален`);
            logout();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        try {
            const token = getToken();
            const id = await GetUserId(token);

            const response = await fetch(`http://localhost:8080/users/${id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}`);
            }


        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Личный кабинет</h2>
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

                <button type="submit">Применить изменения</button>
                <button onClick={logout} style={{background: "indianred"}}>Выйти из аккаунта</button>
                <button onClick={handleDeleteUser} style={{background: "red"}}>Удалить аккаунт</button>
            </form>
        </div>
    );
}

export default Profile;