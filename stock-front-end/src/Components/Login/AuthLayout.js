import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './AuthPage.css';

// This is the SVG for the beautiful wavy background.
// Placing it here keeps the JSX for the pages cleaner.
const WelcomeBackground = () => (
  <svg className="welcome-bg-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="30" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ff00a9', stopOpacity:1}} />
        <stop offset="100%" style={{stopColor: '#8a2be2', stopOpacity:1}} />
      </linearGradient>
      <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: '#00e0ff', stopOpacity:1}} />
        <stop offset="100%" style={{stopColor: '#8a2be2', stopOpacity:1}} />
      </linearGradient>
    </defs>
    <path fill="url(#grad2)" filter="url(#glow)" d="M600,400 C650,200 750,300 800,400 L800,800 L0,800 L0,400 C100,500 250,550 400,400 C500,300 550,500 600,400 Z" />
    <path fill="url(#grad1)" filter="url(#glow)" d="M200,400 C150,600 50,500 0,400 L0,800 L800,800 L800,400 C700,300 550,250 400,400 C300,500 250,300 200,400 Z" opacity="0.7" />
  </svg>
);

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H8V8H4V4ZM10 4H14V8H10V4ZM16 4H20V8H16V4ZM4 10H8V14H4V10ZM10 10H14V14H10V10ZM16 10H20V14H16V10ZM4 16H8V20H4V16ZM10 16H14V20H10V16ZM16 16H20V20H16V16Z" fill="currentColor" />
  </svg>
);


const AuthLayout = ({ children, welcomeTitle }) => {
  const location = useLocation();
  const isSignUp = location.pathname === '/signup';

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side: Form Section */}
        <section className="auth-form-section">
          {children}
        </section>

        {/* Right Side: Welcome Graphic Section */}
        <section className="auth-welcome-section">
          <WelcomeBackground />
          <nav className="welcome-nav">
            {/* <NavLink to="/#">Home</NavLink>
            <NavLink to="/#">Download</NavLink>
            <NavLink to="/#">About</NavLink> */}
            <NavLink to={isSignUp ? "/signin" : "/signup"} className="register-btn">
              {isSignUp ? 'Sign In' : 'Register'}
            </NavLink>
          </nav>
          <div className="welcome-text">
            <h1>{welcomeTitle}</h1>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthLayout;