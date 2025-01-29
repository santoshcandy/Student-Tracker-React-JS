import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/teacherlogin.css"
const TeacherLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/teacher/login/', {
                phone_number: phoneNumber,
                password: password,
            });
            localStorage.setItem('teacherId', response.data.teacher_id); // Store teacher ID in local storage
            navigate('/teacher/classes');
        } catch (error) {
            console.log(error)
            setMessage('Invalid Credentials');
        }
    };

    return (
        <div className="login-container">
        <h2 className="section-title">Teacher Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="form-control"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
            />
            <button type="submit" className="btn-login">Login</button>
        </form>
        {message && <p className="success-message">{message}</p>}
    </div>
    );
};

export default TeacherLogin;
