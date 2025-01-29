import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarksForm = ({ studentId, markId, existingMarkData, onFormSubmit }) => {
    const [subject, setSubject] = useState(existingMarkData ? existingMarkData.subject : '');
    const [assignmentMarks, setAssignmentMarks] = useState(existingMarkData ? existingMarkData.assigment_marks : 0);
    const [seminarMarks, setSeminarMarks] = useState(existingMarkData ? existingMarkData.seminar_marks : 0);
    const [assessmentMarks, setAssessmentMarks] = useState(existingMarkData ? existingMarkData.assessment_marks : 0);
    const [behaviourMarks, setBehaviourMarks] = useState(existingMarkData ? existingMarkData.behaviour_marks : 0);
    const [teacher, setTeacher] = useState(existingMarkData ? existingMarkData.teacher : '');
    const [student, setStudent] = useState(studentId);  // Assuming studentId is passed as a prop

    const handleSubmit = async (e) => {
        e.preventDefault();

        const marksData = {
             teacher,
            student,
            subject,
            assigment_marks: assignmentMarks,
            seminar_marks: seminarMarks,
            assessment_marks: assessmentMarks,
            behaviour_marks: behaviourMarks,
        };
        const marksDataa = {
            teacher_id:teacher,
            student,
            subject,
            assigment_marks: assignmentMarks,
            seminar_marks: seminarMarks,
            assessment_marks: assessmentMarks,
            behaviour_marks: behaviourMarks,
        };

        try {
            let response;
            if (markId) {
                // If markId exists, we are updating an existing mark
                response = await axios.put(`http://127.0.0.1:8000/api/marks/${markId}/`, marksDataa);
            } else {
                // If markId doesn't exist, create a new mark
                response = await axios.post('http://127.0.0.1:8000/api/marks/', marksData);
            }

            onFormSubmit(response.data); // Pass the response data back to the parent component
        } catch (error) {
            console.error('Error submitting the marks:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="marks-form">
            <h2>{markId ? 'Update' : 'Add'} Marks</h2>
            
            <div>
                <label>Subject</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Assignment Marks</label>
                <input
                    type="number"
                    value={assignmentMarks}
                    onChange={(e) => setAssignmentMarks(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Seminar Marks</label>
                <input
                    type="number"
                    value={seminarMarks}
                    onChange={(e) => setSeminarMarks(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Assessment Marks</label>
                <input
                    type="number"
                    value={assessmentMarks}
                    onChange={(e) => setAssessmentMarks(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Behaviour Marks</label>
                <input
                    type="number"
                    value={behaviourMarks}
                    onChange={(e) => setBehaviourMarks(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Teacher</label>
                <input
                    type="text"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                    required
                />
            </div>

            <button type="submit">{markId ? 'Update' : 'Create'} Marks</button>
        </form>
    );
};

export default MarksForm;
