import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/studentlogin.css";

const StudentLogin = () => {
  const [regNumber, setRegNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your API
      const response = await axios.post('http://127.0.0.1:8000/api/student/login/', {
        reg_number: regNumber,
      });

      // Store the student_id returned from the response
      const studentId = response.data.student_id;
      
      // Save the student_id and token (if returned) to localStorage
      localStorage.setItem('student_id', studentId);
      localStorage.setItem('student_token', response.data.token); // If a token is returned
      navigate(`/teacher/students/${studentId}/dashboard`);

      // Navigate to the student dashboard using student_id
     } catch (err) {
      setError('Invalid registration number. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="regNumber" className="form-label text-light">Registration Number</label>
            <input
              type="text"
              id="regNumber"
              className="form-control"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
