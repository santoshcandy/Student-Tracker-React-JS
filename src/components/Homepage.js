import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Homepage.css'; // We will add custom CSS here

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="content-container">
        <h1 className="ch animate__animated animate__fadeIn">Welcome to the Student Tracker</h1>
        <p className="cp animate__animated animate__fadeIn animate__delay-1s">Please choose your login option:</p>
        <div>
          <Link to="/teacher/login" className="btn btn-teacher m-3 animate__animated animate__fadeIn animate__delay-2s">
            Login as Teacher
          </Link>
          <Link to="/student/login" className="btn btn-student m-3 animate__animated animate__fadeIn animate__delay-3s">
            Login as Student
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
