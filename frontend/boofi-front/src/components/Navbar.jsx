import React from "react";
import {Link, useLocation} from "react-router-dom"; // правильный импорт
import "../styles/Navbar.css";
import logo from '../img/BoofiLogo.png';

function Navbar() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <nav className="navbar">
            <Link to="/">
                <img src={logo} alt="Logo" className="logo"/>
            </Link>

            {(path === "/" || path === "/about" || path === "/contact") && (
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
            )}

            {path.startsWith("/coworking") && (
                <div className="nav-panel">
                    <span>Панель коворкинга</span>
                </div>
            )}

            {path.startsWith("/meeting") && (
                <div className="nav-panel">
                    <span>Панель переговорок</span>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
