import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';  // ⬅️ import Link
import baseURL from '../../http';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');

    try {
      const res = await axios.post(`${baseURL}auth/login`, {
        email,
        password,
      });

      console.log("Login response:", res);

      const token = res?.data?.token;
      if (!token) {
        setErrMsg("Token not received from server");
        return;
      }

      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setErrMsg('Invalid credentials');
    }
  };


  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errMsg && <p className={styles.error}>{errMsg}</p>}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>

        {/* 👇 Sign up link */}
        <p className={styles.signupText}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
