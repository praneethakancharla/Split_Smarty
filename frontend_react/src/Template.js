// Template.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
function Navigation() {
  return (
    <nav className='nav'>
      <ul className='ul'>
        <li className='li'><button>Help</button></li>
        <li className='li'><button>About Us</button></li>
        <li className='li'><Link to="/Create_Acc"><button id="sign-up-1">Sign Up</button></Link></li>
        <li className='li'><Link to="/Login_Page"><button id="home">Home</button></Link></li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
    </footer>
  );
}

export { Navigation, Footer };
