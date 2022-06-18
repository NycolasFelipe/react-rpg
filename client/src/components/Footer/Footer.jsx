import React from 'react'
import './Footer.css'

export default function Footer(props) {
  const darkMode = props.darkMode;

  return (
    <div className='container-footer'>
      <h1 className='footer-title'>Thank you for visiting!</h1>
      <div className='footer-links'>
        <div className='link-github'>
          <a target="_blank" href="https://github.com/NycolasFelipe">
            <img 
              src="/images/github.png" 
              className=
              {
                'link-icon ' + (darkMode ? 'link-icon--lm' : '')
              }
              alt="GitHub Link"
            />
            <p>GitHub</p>
          </a>
        </div>
        <div className='link-linkedin'>
          <a target="_blank" href="https://www.linkedin.com/in/nycolas-felipe-louren%C3%A7o-0448b6150/">
            <img 
              src="/images/linkedin.png" 
              className=
              {
                'link-icon ' + (darkMode ? 'link-icon--lm' : '')
              }
              alt="LinkedIn Link"
            />
            <p>LinkedIn</p>
          </a>
        </div>
        <div className='link-email'>
          <a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=nycolasfelipe.contato@gmail.com&su=CONTACT">
            <img 
              src="/images/email.png" 
              className=
              {
                'link-icon ' + (darkMode ? 'link-icon--lm' : '')
              }
              alt="Email Link"
            />
            <p>Send an email</p>
          </a>
        </div>
      </div>
      <div className='footer-copyright'>
        <p>&copy; 2022 Copyright — Designed by NycolasFelipe</p>
      </div>
    </div>
  )
}