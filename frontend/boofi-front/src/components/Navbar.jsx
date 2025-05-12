import React from "react";
import {Link} from "react-router-dom";
import "../styles/Navbar.css";
import logo from '../img/BoofiLogo.png';
// import {isAuthenticated} from "../Auth.jsx";
import { useAuth } from './AuthContext.jsx';

function Navbar() {
    const { isAuth } = useAuth();
    if (!isAuth) {
        return (
            <nav className="navbar">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo"/>
                </Link>

                <>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Главная</Link>
                        <Link to="/about" className="nav-link">Обо мне</Link>
                        <Link to="/contact" className="nav-link">Контакты</Link>
                    </div>

                    <div className="auth-buttons">
                        <Link to={"/auth/register"}>
                            <button className="btn">Регистрация</button>
                        </Link>
                        <Link to={"/auth/login"}>
                            <button className="btn">Вход</button>
                        </Link>
                    </div>
                </>
            </nav>
        );
    } else {
        return (
            <nav className="navbar">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo"/>
                </Link>

                <>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Главная</Link>
                        <Link to="/about" className="nav-link">Обо мне</Link>
                        <Link to="/contact" className="nav-link">Контакты</Link>
                    </div>

                    <div className="auth-buttons">
                        <Link to={"/profile"}>
                            <button className="btn">Личный кабинет</button>
                        </Link>
                    </div>
                </>
            </nav>

        );
    }

}

export default Navbar;
