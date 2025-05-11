import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {clearToken, getToken, saveToken} from "../Auth.jsx";
import "../styles/Form.css"

function Profile() {
    const [form, setForm] = useState({name: "", email: "", password: ""});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setForm(f => ({...f, [e.target.name]: e.target.value}));

    const logout = () => {
        clearToken();
        navigate("/auth/register");
    }

    const handleDeleteUser = async e => {
        e.preventDefault();
        setError("");
        try {
            const token = getToken();
            // const response = await fetch(`https://localhost:8080/users/${id}`, {
            //     method: "DELETE",
            //     headers: { "Content-Type": "application/json"},
            //     body: JSON.stringify(form)
            // });
            console.log(token);
        } catch (err) {
            setError(err);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        try {
            const resp = await fetch("http://localhost:8080/profile", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(form)
            });
            const text = await resp.text();
            if (!resp.ok) throw new Error(text || `Ошибка ${resp.status}`);

            const {token} = JSON.parse(text);
            saveToken(token);
            navigate("/auth/register");
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
                <button onClick={handleDeleteUser}>Удалить аккаунт</button>
            </form>
        </div>
    );
}

export default Profile;