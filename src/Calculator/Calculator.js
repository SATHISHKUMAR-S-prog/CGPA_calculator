import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const Calculator = ({title,num}) => {
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (year && department && semester) {
        if(title === "GPA calculator")
          navigate(`/GPA/getAll/${year}/${department}/${semester}`);
        else {
          navigate(`/CGPA/getAll/${year}/${department}/${semester}`);
        }
      } else {
        alert('Please select all fields.');
      }
    } catch (e) {
      alert('Navigation failed.');
    }
  };

  return (
    <>
    <Header title={title} />
      <form id="cgpa-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="regulation">Select Regulation:</label>
          <select
            id="regulation"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">-- Select Regulation --</option>
            <option value='2017'>2017</option>
            <option value="2021">2021</option>
          </select>
        </div>

        <div>
          <label htmlFor="department">Select Department:</label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">-- Select Department --</option>
            <option value="EEE">Electrical and Electronics Engineering (EEE)</option>
            <option value="ECE">Electronics and Communication Engineering (ECE)</option>
            <option value="CSE">Computer Science Engineering (CSE)</option>
            <option value="Civil">Civil Engineering</option>
            <option value="Mech">Mechanical Engineering</option>
          </select>
        </div>

        <div>
          <label htmlFor="num-semesters">Select{num} Semester:</label>
          <select
            id="num-semesters"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">-- Select Semesters --</option>
            <option value="1">1 </option>
            <option value="2">2 </option>
            <option value="3">3 </option>
            <option value="4">4 </option>
            <option value="5">5 </option>
            <option value="6">6 </option>
            <option value="7">7 </option>
            <option value="8">8 </option>
          </select>
        </div>

        <button
          type="submit"
          id="show-subjects-btn"
          className="btn"
        >
          Show Subjects
        </button>
      </form>
    </>
  );
};

export default Calculator;
