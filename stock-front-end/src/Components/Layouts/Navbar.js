import React from 'react';
import styles from './Navbar.module.css';
import { getCurrentUser, logout } from '../utils/auth';
import { Link } from 'react-router-dom'; // ← import Link

function Navbar() {
  const user = getCurrentUser();

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>💼 Asset View</div>
      </div>

      {user && (
        <Link to="/create-portfolio" className={styles.navLink}>
          Create Portfolio
        </Link>
      )}

      {user && (
        <div className={styles.userSection}>
          <span className={styles.userName}>Hi, {user.name || user.email}</span>
          <button onClick={logout} className={styles.logoutBtn}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
