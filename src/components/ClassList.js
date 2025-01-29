import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/classes.css"
const ClassList = () => {
    const [classes, setClasses] = useState([]);
    const teacherId = localStorage.getItem('teacherId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/teacher/${teacherId}/classes`);
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes');
            }
        };
        fetchClasses();
    }, [teacherId]);

    const handleClassClick = (classId) => {
        navigate(`/teacher/classes/${classId}/students`);
    };

    return (
        <div className="classes-section">
        <h2 className="section-title">Classes</h2>
        <ul className="classes-list">
            {classes.map((classItem) => (
                <li key={classItem.id} className="class-item" onClick={() => handleClassClick(classItem.id)}>
                    {classItem.name}
                </li>
            ))}
        </ul>
    </div>
    
    );
};

export default ClassList;
