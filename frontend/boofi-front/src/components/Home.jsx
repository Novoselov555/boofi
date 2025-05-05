import React from "react";
import {Link} from "react-router";
import "../styles/Home.css"
import coworking from "../img/coworking.jpg"
import meeting from "../img/meeting.jpg"
import callBox from "../img/callbox.jpg"

function Home() {
    return (
        <div className="home-container">
            <Link to="/coworking" className="home-card">
                <img src={coworking} alt="coworking" className="card-image"/>
                <p className="card-label">Бронирование мест в коворкинге</p>
            </Link>
            <Link to="/meeting" className="home-card">
                <img src={meeting} alt="meeting" className="card-image"/>
                <p className="card-label">Бронирование переговорок</p>

            </Link>
            <Link to="/callbox" className="home-card">
                <img src={callBox} alt="call-box" className="card-image"/>
                <p className="card-label">Бронирование зоны для звонков</p>

            </Link>
        </div>
    );
}

export default Home;