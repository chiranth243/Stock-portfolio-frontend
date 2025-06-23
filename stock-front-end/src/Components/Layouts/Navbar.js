// src/components/Navbar.jsx

import React, { useState } from 'react';
import { getCurrentUser, logout } from '../utils/auth';

// You can use an actual SVG file, but for simplicity, we'll use a component
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H8V8H4V4ZM10 4H14V8H10V4ZM16 4H20V8H16V4ZM4 10H8V14H4V10ZM10 10H14V14H10V10ZM16 10H20V14H16V10ZM4 16H8V20H4V16ZM10 16H14V20H10V16ZM16 16H20V20H16V16Z" fill="currentColor" />
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
  </svg>
);


const Navbar = ({onInvestClick}) => {
  const user = getCurrentUser();
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Logo />
        <h1 className="app-title">Portfolify</h1>
      </div>
      <div className="navbar-right">
        <span className="user-greeting">Hi, {user?.name}!</span>
        <button className="invest-button" onClick={onInvestClick}>
          Invest Now
        </button>
        <div className="profile-container">
          <button
            className="profile-button"
            onClick={() => setProfileOpen(!isProfileOpen)}
          >
            <UserIcon />
          </button>
          {isProfileOpen && (
            <div className="profile-dropdown">
              <ul>
                <li className="dropdown-user-info">
                  <strong>{user?.name}</strong>
                  {/* <small>User ID: 2</small> */}
                </li>
                <li>Profile</li>
                <li>Settings</li>
                <li onClick={logout}  style={{ cursor: 'pointer' }}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;