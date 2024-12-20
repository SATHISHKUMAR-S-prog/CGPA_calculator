import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import api from "../api/Subjects"

const Subject = () => {

  const {year,department,semester} = useParams()

  const [GPA,setGPA] = useState()
  const [Subject,setSubject] = useState([])
  const [grade,setGrade] = useState({})
  const [review,setReview] = useState()

  useEffect(() => {
    (async () => {
      await getDetails();
    })();
  }, [year, department, semester]);

  async function getDetails() {
    try {
      const response = await api.get(
        `/GPA/getsubject/${year}/${department}/${semester}`
      );
      setSubject(response.data);
      // console.log(response.data)
    } catch (error) {
      alert('Failed to fetch data. Please try again.');
      console.error("Error fetching data:", error.message);
    }
  }

  const gradeMapping = {
    "O":10,
    "A+":9,
    "A":8,
    "B+":7,
    "B":6,
    "RA":0
  }

  const handleChange = (subject, grade) => {
    setGrade((prevGrades) => ({
      ...prevGrades,
      [subject.id] : grade * subject.credit
    }));
  };

  const calculateGPA = async () => {
    let totalScore = 0
    let totalCredits = 0
    Subject.map( subject => {
      const gradeValue = grade[subject.id];
      if (gradeValue === undefined) {
        alert(`Please select a grade for ${subject.subjectName}`);
        return;
      } else {
      totalCredits += subject.credit;
      totalScore += gradeValue;
      }
    }) 
    if(totalCredits){
        const calculatedGpa = totalScore > 0 ? (totalScore / totalCredits).toFixed(2) : (0) ;
        setGPA(calculatedGpa)
        reviews(calculatedGpa)
        // send(totalCredits)
       }
  }

  const reviews = (GPA) => {
    const review = GPA >= 9 ? "you score is excelent" : GPA >= 8.5 ? "You got very good Score" : GPA >= 8 ? "You got good score" : "You need to improve your score"
    setReview(review)
  }

 
  // const send = async (credits) => {
  //   const post = {year,department,semester,credits}
  //  try {
  //   await axios.post("http://localhost:8080/CGPA/post",post);
  //   alert("details added")
  //  } catch (error) {
  //     alert("can't send details",error.message)
  //  }
  // }

  return (
    <div>
      <Header title={"GPA Calculator"}/>
      <h3>Semester {semester}</h3>
      <form>
        {Subject.map((subject) => (
          <div key={subject.id} className="subject-container" aria-required> 
            <label>{`${subject.subjectCode}-${subject.subjectName} (${subject.credit} credits):`}</label>
            <div className='radio-container'>
              {Object.keys(gradeMapping).map((grades) => (
                <label key={grades}>
                  <input
                   type="radio"
                   name={subject.id}
                   value={gradeMapping[grades]}
                   onClick={(e) => handleChange(subject, e.target.value)}
                  />
                  {grades}
                </label>
              ))} <hr />
            </div>
          </div>
        ))}
      </form>
      <button onClick={() => calculateGPA()}>Calculate GPA</button>
      
        <div className="result">
        {GPA !== undefined && (
          <div>
          <h2>Your GPA is: {GPA}</h2>
          <h3 style={{color:`lightseagreen`}}>{review}</h3>
          </div>
        )} 
          <p>[Note: This Calculated GPA value may be different in your Mark Sheet]</p>
        </div>
     
    </div>
  )
}

export default Subject