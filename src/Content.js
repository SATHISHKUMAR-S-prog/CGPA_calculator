import React from 'react'
import { Link } from 'react-router-dom'
import Header from "./Header"

const Content = () => {
  
  
  return (
    <div>
        <Header title={"Calculator"}/>
        <Link to="/GPA"><button>GPA Calculator</button></Link>
        <Link to="/CGPA"><button>Calculate CGPA by GPA</button></Link>
        <a href='https://au-cgpa-calculator.netlify.app/'><button>calculate CGPA by subject</button></a>
        {/* https://au-cgpa-calculator.netlify.app/  => this website is created by my friend */}
    </div>
  )
}

export default Content