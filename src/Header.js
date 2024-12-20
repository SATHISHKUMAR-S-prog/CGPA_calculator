import React from 'react'
import logo from './anna-university-logo.jpg';

const Header = ({title}) => {
  return (
    <header>
        <h1>
            <img src={logo} alt="Anna University Logo" id="logo" />
            Anna University<br />{title}
        </h1>
    </header>
  )
}

export default Header