import React from 'react'
import './Header.css';

export default function Header(props) {
  const darkMode = props.darkMode;
  return (
    <div className='container-header'>
      <div className='header-div'>
        <img 
          src="./images/logo.svg" 
          alt="logo" 
          className="header-logo"
        />
        <h1 className='header-title'>
          RPG Dice Roller & Player Sheet Manager
        </h1>
      </div>
      <div 
        className={darkMode ? "header-toggle-light--lm" : "header-toggle-light--dm"}
        onClick={() => props.changeDarkMode()}
      ></div>
    </div>
  )
}