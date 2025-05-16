import React, {useState, useEffect} from "react";
import "../styles/Coworking.css";

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

function Coworking() {
    const [selected, setSelected] = useState([]);
    const [activeSeat, setActiveSeat] = useState(null);
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("17:00");
    const maxDuration = 8 * 60; // минут

    const toggleSeat = (id) => {
        setActiveSeat(id);
        setStartTime("09:00");
        setEndTime("17:00");
    };

    const confirmBooking = () => {
        setSelected(prev => [...prev, activeSeat]);
        setActiveSeat(null);
    };

    const closePanel = () => {
        setActiveSeat(null);
    };

    useEffect(() => {
        if (!activeSeat) return;
        const [h1, m1] = startTime.split(":").map(Number);
        const [h2, m2] = endTime.split(":").map(Number);
        const delta = (h2 * 60 + m2) - (h1 * 60 + m1);
        if (delta > maxDuration) {
            const limit = h1 * 60 + m1 + maxDuration;
            const newH = String(Math.floor(limit / 60)).padStart(2, "0");
            const newM = String(limit % 60).padStart(2, "0");
            setEndTime(`${newH}:${newM}`);
        }
    }, [startTime, endTime, activeSeat]);

    return (
        <div className="coworking-wrapper">
            <div className="grid-container">
                {initialSeats.map(seat => (
                    <div
                        key={seat.id}
                        className={`seat ${selected.includes(seat.id) ? "selected" : ""}`}
                        style={{ gridColumn: seat.col, gridRow: seat.row }}
                        onClick={() => toggleSeat(seat.id)}
                    />
                ))}
            </div>

            {/* Компактная панель под шапкой */}
            {activeSeat && (
                <div
                    className="booking-panel"
                    style={{
                        position: "fixed",
                        top: "64px",       // сразу после синей шапки
                        right: 0,
                        width: "280px",    // компактная ширина
                        padding: "16px",
                        background: "#fff",
                        boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
                        height: "auto",
                        zIndex: 1000
                    }}
                >
                    <button className="close-btn" onClick={closePanel}>×</button>
                    <h2 style={{ fontSize: "16px", margin: "8px 0" }}>
                        Место №{activeSeat}
                    </h2>
                    <label style={{ display: "block", marginBottom: "12px" }}>
                        Начало
                        <input
                            type="time"
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                            style={{ width: "100%", marginTop: "4px" }}
                        />
                    </label>
                    <label style={{ display: "block", marginBottom: "16px" }}>
                        Конец
                        <input
                            type="time"
                            value={endTime}
                            onChange={e => setEndTime(e.target.value)}
                            style={{ width: "100%", marginTop: "4px" }}
                        />
                    </label>
                    <button
                        className="confirm-btn"
                        onClick={confirmBooking}
                        style={{
                            width: "100%",
                            padding: "8px",
                            background: "#0052cc",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        Подтвердить
                    </button>
                </div>
            )}
        </div>
    );
}

export default Coworking;
