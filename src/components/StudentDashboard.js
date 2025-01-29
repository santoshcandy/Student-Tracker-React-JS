import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../style/StudentDashboard.css"
import MarksForm from './MarksForm';
const StudentDashboard = () => {
    const { studentId } = useParams(); // Using useParams() for React Router v6
    const [studentData, setStudentData] = useState({});
    const [marks, setMarks] = useState([]);
    const [selectedMarkId, setSelectedMarkId] = useState(null);  // To track the mark being updated
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/student/${studentId}/dasboard/`);
                setStudentData(response.data.student_info);
                setMarks(response.data.marks);
            } catch (error) {
                console.error('Error fetching student data', error);
            }
        };
        if (studentId) { // Ensure studentId is not undefined before making the API call
            fetchStudentData();
        }
    }, [studentId]);

    const handleEditMarks = (markId) => {
        setSelectedMarkId(markId);  // Set the markId that you want to edit
        setIsEditing(true);  // Show the form in edit mode
    };

    const handleCreateMarks = () => {
        setSelectedMarkId(null);  // Reset selectedMarkId for new mark
        setIsEditing(true);  // Show the form in create mode
    };


    const handleFormSubmit = (newMarkData) => {
        // Update the marks list with the new/updated mark data
        if (selectedMarkId) {
            const updatedMarks = marks.map((mark) => (mark.id === newMarkData.id ? newMarkData : mark));
            setMarks(updatedMarks);
        } else {
            setMarks([newMarkData, ...marks]);  // Add the new mark to the list
        }
        setIsEditing(false);  // Close the form after submit
    };

    return (
        <div className="dashboard-container">
        <div className="dashboard-header">
            <h1 className="dashboard-title">{studentData.name}'s Dashboard</h1>
            <h3 className="total-score">Total Score: {studentData.overall_score}</h3>
        </div>

        <div className="student-info">
            <h2 className="section-title">Student Information</h2>
            <p><strong>Registration Number:</strong> {studentData.reg_number}</p>
            <p><strong>Date of Birth:</strong> {studentData.dob}</p>
            <p><strong>Gender:</strong> {studentData.sex}</p>
            <p><strong>Class:</strong> {studentData.student_class_name}</p>
        </div>

        <div className="marks-section">
            <h2 className="section-title">Marks</h2>
            <button className="btn btn-primary" onClick={handleCreateMarks}>Add New Marks</button>
            <ul className="marks-list">
                {marks.map((mark) => (
                    <li key={mark.id} className="mark-item">
                        <div><strong>Subject:</strong> {mark.subject}</div>
                        <div><strong>Assignment Marks:</strong> {mark.assigment_marks}</div>
                        <div><strong>Seminar Marks:</strong> {mark.seminar_marks}</div>
                        <div><strong>Teacher:</strong> {mark.teacher_name}</div>
                        <button className="btn btn-warning" onClick={() => handleEditMarks(mark.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>

        {isEditing && (
            <MarksForm
                studentId={studentId}
                markId={selectedMarkId}
                existingMarkData={marks.find(mark => mark.id === selectedMarkId)}
                onFormSubmit={handleFormSubmit}
            />
        )}
    </div>
    );
};

export default StudentDashboard;
