import { Route, Routes } from 'react-router-dom';
import './App.css';
import Content from './Content';
import Subject from './Calculator/Subject';
import Calculator from './Calculator/Calculator';
import Credits from './Calculator/Credits';

function App() {
  return (
    <div className="App" >
      <div className='container'>
      <Routes>
        <Route path='/' element={<Content />} />
        <Route path='/GPA' >
          <Route index element={<Calculator
            title={"GPA calculator"} 
            num={""}/>} 
          />
          <Route path='getAll/:year/:department/:semester' element={<Subject />} /> 
        </Route>
        <Route path='/CGPA' >
          <Route index element={<Calculator 
            title={"CGPA calculator"} 
            num={" Number of"}/>} />
          <Route path='getAll/:year/:department/:semester' element={<Credits />} /> 
        </Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;
