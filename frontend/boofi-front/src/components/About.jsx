import React from "react";
import boofiCreator from "../img/boofi-creator.jpg"
function About() {
    return (
        <div className="main-part">
            <p>
                Привет, это я, диктор канала "Мастерская настроения". Ладно, это сервис по бронированию мест BOOFI.
            </p>
            <p>
                Почему BOOFI? Потому что этот шлепок майонезный <img src={boofiCreator} width="400px" height="300px"></img> придумал соединить booking и свое имя Efim. Поэтому BOOFI
            </p>
        </div>
    );
}

export default About;