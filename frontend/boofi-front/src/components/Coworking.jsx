import React, {useState, useEffect} from "react";
import "../styles/Coworking.css";
import {getToken} from "../Auth.jsx";

const initialSeats = [
    // Верхняя линия (четверки)
    { id: 1, row: 1, col: 1 }, { id: 2, row: 2, col: 1 },
    { id: 3, row: 1, col: 2 }, { id: 4, row: 2, col: 2 },
    { id: 5, row: 1, col: 4 }, { id: 6, row: 2, col: 4 },
    { id: 7, row: 1, col: 5 }, { id: 8, row: 2, col: 5 },

    { id: 9, row: 1, col: 7 }, { id:10, row: 2, col: 7 },
    { id:11, row: 1, col: 8 }, { id:12, row: 2, col: 8 },
    { id:13, row: 1, col: 10 }, { id:14, row: 2, col: 10 },
    { id:15, row: 1, col:11 }, { id:16, row: 2, col:11 },

    { id:17, row: 1, col: 13 }, { id:18, row: 2, col: 13 },
    { id:19, row: 1, col: 14 }, { id:20, row: 2, col: 14 },

    // Средняя линия (одна двойка)
    { id:21, row: 4, col: 1 }, { id:22, row: 5, col: 1 },

    // Нижняя линия (двойки)
    { id:23, row: 7, col: 1 }, { id:24, row: 8, col: 1 },

    { id:25, row: 7, col: 5 }, { id:26, row: 8, col: 5 },
    { id:27, row: 7, col: 8 }, { id:28, row: 8, col: 8 },
    { id:29, row: 7, col: 11 }, { id:30, row: 8, col: 11 },
    { id:31, row: 7, col: 14 }, { id:32, row: 8, col: 14 },


];

function Coworking(interval=5000) {
    const [seats, setSeats] = useState([]);

    const fetchSeats = async () => {
        const token = getToken();
        const response = await fetch("http://localhost:8080/coworking", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json()
        try{
            if (response.ok) {
                console.log(data);
                setSeats(data);
                console.log(token);
            } else {
                throw new Error(response);
            }
        } catch(err) {
            console.log(err)
        }

    };


    useEffect(() => {
        fetchSeats();
        const timer = setInterval(fetchSeats, interval);
        return () => {
            clearInterval(timer);
        }
    }, [interval]);

    return seats;
}

export default Coworking;
