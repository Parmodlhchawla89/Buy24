import React from 'react';
import "./Footer.scss";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer bg-orange'>
      <div className = "container py-4 text-center">
        <div className='flex align-center justify-center text-white fw-3 fs-14'>
          <Link to = "/" className='text-uppercase'>privacy policy</Link>
          <div className='vert-line'></div>
          <Link to = "/" className='text-uppercase'>term of service</Link>
          <div className='vert-line'></div>
          <Link to = "/" className='text'>ABOUT Buy24.</Link>
        </div>
        <span className='text-white copyright-text text-manrope fs-14 fw-3'>&copy; 2026 Buy24. All Rights Reserved.</span>
        <span className='text-white copyright-text text-manrope fs-14 fw-3'>GUID: 2eca8716-2a99-48d2-8d19-51606673a985</span>
      </div>
    </footer>
  )
}

export default Footer