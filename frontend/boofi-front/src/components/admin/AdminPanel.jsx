import React, { useState, useEffect } from 'react';
import { getToken } from '../../Auth.jsx';
import './AdminPanel.css';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            if (activeTab === 'bookings') {
                const response = await fetch('http://localhost:8080/admin/bookings', {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                });
                if (!response.ok) throw new Error('Ошибка при загрузке бронирований');
                const data = await response.json();
                setBookings(data);
            } else if (activeTab === 'users') {
                const response = await fetch('http://localhost:8080/admin/users', {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                });
                if (!response.ok) throw new Error('Ошибка при загрузке пользователей');
                const data = await response.json();
                setUsers(data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBooking = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/bookings/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            if (!response.ok) throw new Error('Ошибка при удалении бронирования');
            fetchData();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateUserRole = async (id, newRole) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/users/${id}/role`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRole)
            });
            if (!response.ok) throw new Error('Ошибка при обновлении роли');
            fetchData();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <button 
                    className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    Бронирования
                </button>
                <button 
                    className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    Пользователи
                </button>
            </div>

            <div className="admin-content">
                {error && <div className="error-message">{error}</div>}
                {loading ? (
                    <div className="loading">Загрузка...</div>
                ) : (
                    <>
                        {activeTab === 'bookings' && (
                            <div className="bookings-list">
                                <h2>Список бронирований</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Пользователь</th>
                                            <th>Место</th>
                                            <th>Статус</th>
                                            <th>Начало</th>
                                            <th>Конец</th>
                                            <th>Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map(booking => (
                                            <tr key={booking.id}>
                                                <td>{booking.id}</td>
                                                <td>{booking.userId}</td>
                                                <td>{booking.seatId}</td>
                                                <td>{booking.status}</td>
                                                <td>{new Date(booking.startTime).toLocaleString()}</td>
                                                <td>{new Date(booking.endTime).toLocaleString()}</td>
                                                <td>
                                                    <button 
                                                        className="delete-btn"
                                                        onClick={() => handleDeleteBooking(booking.id)}
                                                    >
                                                        Удалить
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="users-list">
                                <h2>Список пользователей</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Имя</th>
                                            <th>Email</th>
                                            <th>Роль</th>
                                            <th>Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                                                    >
                                                        <option value="USER">USER</option>
                                                        <option value="ADMIN">ADMIN</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default AdminPanel; 