import React from 'react'
import './Footer.css'

export default function Footer(props) {
  const darkMode = props.darkMode;

  return (
    <div className='container-footer'>
      <h1 className='footer-title'>Thank you for visiting!</h1>
      <div className='footer-links'>
        <div className='link-github'>
          <img 
            src="/images/github.png" 
            className=
            {
              'link-icon ' + (darkMode ? 'link-icon--lm' : '')
            }
            alt="GitHub Link"
          />
          <p>GitHub</p>
        </div>
        <div className='link-linkedin'>
          <img 
            src="/images/linkedin.png" 
            className=
            {
              'link-icon ' + (darkMode ? 'link-icon--lm' : '')
            }
            alt="LinkedIn Link"
          />
          <p>LinkedIn</p>
        </div>
        <div className='link-email'>
          <img 
            src="/images/email.png" 
            className=
            {
              'link-icon ' + (darkMode ? 'link-icon--lm' : '')
            }
            alt="Email Link"
          />
          <p>Send an email</p>
        </div>
      </div>
      <div className='footer-copyright'>
        <p>&copy; 2022 Copyright — Designed by NycolasFelipe</p>
      </div>
    </div>
  )
}