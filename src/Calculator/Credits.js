import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import api from "../api/Subjects"

const Credits = () => {
const {year,department,semester} = useParams()

    const [sem,setSem] = useState([])
    const [Credit,setCredits] = useState([])
    const [gpa,setGpa] = useState([])
    const [CGPA,setCGPA] =useState()
    const [review,setReview] = useState()

    useEffect(() => {
       (async () => {
         await getDetails();
       })();
     }, [year, department]);

    const getDetails = async () => {
       try {
        const response = await api.get(`/CGPA/getCredits/${year}/${department}`)
        const fetchedData = response.data;
        setSem(fetchedData) 

        const newCredits = {};
        fetchedData.forEach((item, index) => {
            if (index < semester) {
                newCredits[index + 1] = item.credits;
            }
        });
        setCredits(newCredits);
       } catch (error) {
        alert("please reload the page")
        console.log(error.message)
       }
    }

    const handleGpaChange = (credit, value) => {
            setGpa((prevGpa) => ({
                ...prevGpa,
                [credit]: (parseFloat(value)*(Credit[credit])) || 0,
            }));
        
    };

    const calculateCGPA = () => {
        let totalCredit = 0
        let totalGPA = 0
        let index = 1
        for (let i = 1; i <= semester; i++) {
            if (!gpa[i]) {
                alert(`Please enter the GPA value for semester ${i}`);
                return;
            }
        }

        Object.entries(Credit).forEach((credit) => {
            totalCredit += credit[index]
        })

        Object.entries(gpa).forEach((gpa) => {
            totalGPA += gpa[index]
        })

        const cgpa = totalGPA / totalCredit
        setCGPA(cgpa.toFixed(3))
        reviews(cgpa)
    }

    const reviews = (CGPA) => {
        const review = CGPA >= 9 ? "you score is excelent" : CGPA >= 8.5 ? "You got very good Score" : CGPA >= 8 ? "You got good score" : "You need to improve your score"
        setReview(review)
      }

  return (
        <div>
            <Header title={"CGPA Calculator"} />
            <form className="form-group">
                {Object.keys(Credit).map((credit) => (
                    <div key={credit}>
                        <label>GPA for semester {credit}:</label>
                        <input className="form-control" 
                            type="number" 
                            name={credit}
                            placeholder={`Enter your semester ${credit} GPA`}
                            onChange={(event) => handleGpaChange(credit, event.target.value)}
                            required/>
                    </div>
                ))}
            </form>
            <Button variant='primary' className='w-100' onClick={calculateCGPA}>Calculate CGPA</Button>
            <div className="result">
                {CGPA !== undefined && (
                <div>
                    <h2>Your CGPA is: {CGPA}</h2>
                    <h3 style={{color:`lightseagreen`}}>{review}</h3>
                </div>
                )} 
                <p>[Note: This Calculated CGPA value may be different in your Mark Sheet]</p>
            </div>
        </div>
  )
}

export default Credits