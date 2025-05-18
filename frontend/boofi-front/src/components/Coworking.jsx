import React, { useState, useEffect } from "react";
import "../styles/Coworking.css";
import { getToken } from "../Auth.jsx";

const initialSeats = [
    // Верхняя линия (четверки)
    { id: 1, row: 1, col: 1 }, { id: 2, row: 2, col: 1 },
    { id: 3, row: 1, col: 2 }, { id: 4, row: 2, col: 2 },
    { id: 5, row: 1, col: 4 }, { id: 6, row: 2, col: 4 },
    { id: 7, row: 1, col: 5 }, { id: 8, row: 2, col: 5 },
    { id: 9, row: 1, col: 7 }, { id: 10, row: 2, col: 7 },
    { id: 11, row: 1, col: 8 }, { id: 12, row: 2, col: 8 },
    { id: 13, row: 1, col: 10 }, { id: 14, row: 2, col: 10 },
    { id: 15, row: 1, col: 11 }, { id: 16, row: 2, col: 11 },
    { id: 17, row: 1, col: 13 }, { id: 18, row: 2, col: 13 },
    { id: 19, row: 1, col: 14 }, { id: 20, row: 2, col: 14 },
    // Средняя линия (одна двойка)
    { id: 21, row: 4, col: 1 }, { id: 22, row: 5, col: 1 },
    // Нижняя линия (двойки)
    { id: 23, row: 7, col: 1 }, { id: 24, row: 8, col: 1 },
    { id: 25, row: 7, col: 5 }, { id: 26, row: 8, col: 5 },
    { id: 27, row: 7, col: 8 }, { id: 28, row: 8, col: 8 },
    { id: 29, row: 7, col: 11 }, { id: 30, row: 8, col: 11 },
    { id: 31, row: 7, col: 14 }, { id: 32, row: 8, col: 14 },
];

function Coworking({ interval = 5000 }) {
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [bookingInfo, setBookingInfo] = useState(null);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [bookingTimes, setBookingTimes] = useState({
        startTime: '',
        endTime: ''
    });

    const fetchSeats = async () => {
        const token = getToken();
        try {
            const response = await fetch("http://localhost:8080/coworking", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setSeats(data);
            } else {
                throw new Error(data.message || 'Ошибка при получении данных');
            }
        } catch (err) {
            console.error('Ошибка:', err);
        }
    };

    const handleSeatClick = async (seat) => {
        const occupiedSeat = seats.find(s => s.seatId === seat.id);
        if (occupiedSeat) {
            setSelectedSeat(seat);
            setBookingInfo(occupiedSeat);
            setShowBookingForm(false);
        } else {
            setSelectedSeat(seat);
            setBookingInfo(null);
            setShowBookingForm(true);
            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5);
            setBookingTimes({
                startTime: currentTime,
                endTime: ''
            });
        }
    };

    const handleStartTimeChange = (e) => {
        const startTime = e.target.value;
        setBookingTimes(prev => ({
            ...prev,
            startTime
        }));
    };

    const handleEndTimeChange = (e) => {
        const endTime = e.target.value;
        const start = new Date(`2000-01-01T${bookingTimes.startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);
        const diffHours = (end - start) / (1000 * 60 * 60);

        if (diffHours > 8) {
            alert('Максимальное время бронирования - 8 часов');
            return;
        }

        setBookingTimes(prev => ({
            ...prev,
            endTime
        }));
    };

    const handleBooking = async () => {
        if (!bookingTimes.startTime || !bookingTimes.endTime) {
            alert('Пожалуйста, выберите время начала и окончания');
            return;
        }

        const token = getToken();
        try {
            const response = await fetch("http://localhost:8080/coworking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    seatId: selectedSeat.id,
                    startTime: `${bookingTimes.startTime}:00`,
                    endTime: `${bookingTimes.endTime}:00`,
                    status: "BOOKED"
                })
            });

            if (response.ok) {
                alert('Место успешно забронировано');
                setShowBookingForm(false);
                fetchSeats();
            } else {
                const error = await response.json();
                alert(error.message || 'Ошибка при бронировании');
            }
        } catch (err) {
            console.error('Ошибка:', err);
            alert('Произошла ошибка при бронировании');
        }
    };

    useEffect(() => {
        fetchSeats();
        const timer = setInterval(fetchSeats, interval);
        return () => clearInterval(timer);
    }, [interval]);

    const isSeatOccupied = (seatId) => {
        return seats.some(s => s.seatId === seatId);
    };

    return (
        <div className="coworking-container">
            <div className="seats-grid">
                {initialSeats.map(seat => (
                    <div
                        key={seat.id}
                        className={`seat ${isSeatOccupied(seat.id) ? 'occupied' : 'available'}`}
                        style={{
                            gridRow: seat.row,
                            gridColumn: seat.col
                        }}
                        onClick={() => handleSeatClick(seat)}
                    >
                        {seat.id}
                    </div>
                ))}
            </div>

            {bookingInfo && (
                <div className="booking-info">
                    <h3>Информация о бронировании</h3>
                    <p>Место: {selectedSeat.id}</p>
                    <p>Начало: {bookingInfo.startTime}</p>
                    <p>Окончание: {bookingInfo.endTime}</p>
                    <button onClick={() => setBookingInfo(null)}>Закрыть</button>
                </div>
            )}

            {showBookingForm && (
                <div className="booking-form">
                    <h3>Забронировать место {selectedSeat?.id}</h3>
                    <div className="time-inputs">
                        <div>
                            <label>Время начала:</label>
                            <input
                                type="time"
                                value={bookingTimes.startTime}
                                onChange={handleStartTimeChange}
                                min={new Date().toTimeString().slice(0, 5)}
                            />
                        </div>
                        <div>
                            <label>Время окончания:</label>
                            <input
                                type="time"
                                value={bookingTimes.endTime}
                                onChange={handleEndTimeChange}
                                min={bookingTimes.startTime}
                            />
                        </div>
                    </div>
                    <div className="booking-actions">
                        <button onClick={handleBooking}>Подтвердить</button>
                        <button onClick={() => setShowBookingForm(false)}>Отмена</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Coworking;
