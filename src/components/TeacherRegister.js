import React, { useState } from 'react';
import axios from 'axios';
import "../style/teacherregister.css"
const TeacherRegister = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/teacher/register/', {
                name,
                phone_number: phoneNumber,
                subject,
                password
            });
            setMessage('Registration Successful');
        } catch (error) {
            setMessage('Registration Failed');
        }
    };

    return (
        <div className="registration-form-container">
            <h2 className="section-title">Teacher Registration</h2>
            <form className="registration-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="form-control"
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-control"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                />
                <button type="submit" className="btn-submit">Register</button>
            </form>
            {message && <p className="success-message">{message}</p>}
        </div>
    );
};

export default TeacherRegister;
