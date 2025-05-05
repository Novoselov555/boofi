import React, { useState } from "react";
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

    const toggleSeat = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    return (
        <div className="grid-container">
            {initialSeats.map(seat => (
                <div
                    key={seat.id}
                    className={`seat ${selected.includes(seat.id) ? "selected" : ""}`}
                    style={{
                        gridColumn: seat.col,
                        gridRow: seat.row,
                    }}
                    onClick={() => toggleSeat(seat.id)}
                />
            ))}
        </div>
    );
}

export default Coworking;
