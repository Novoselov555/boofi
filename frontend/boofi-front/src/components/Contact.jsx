import React from "react";
import "../styles/MainPart.css";
import phoneIcon from "../img/phone.png"
import mailIcon from "../img/mail.png"
import tgIcon from "../img/telegram.png"
function Contact() {
    return (
        <div className="main-part">
            Добро пожаловать на сервер шизофрения, если у тебя появились вопросы, то смело можешь:
            <ul className="custom-list">
                <li>
                    <img src={phoneIcon} alt="phone" className="icon"/>
                    Позвонить мне: +79613745565</li>
                <li>
                    <img src={mailIcon} alt="mail" className="icon"/>
                    Написать на почту: <a href="https://mail.ru/">e.novoselov@edu.centraluniversity.ru</a></li>
                <li>
                    <img src={tgIcon} alt="telegram" className="icon" />
                    Пообщаться со мной в тг: <a href="https://t.me/EfimNovoselov">@EfimNovoselov</a></li>
            </ul>
        </div>
    );
}

export default Contact;