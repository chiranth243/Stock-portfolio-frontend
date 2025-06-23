import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';  // ⬅️ import Link
import baseURL from '../../http';
import AuthLayout from './AuthLayout';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setIsLoading(true);

    try {
      const res = await axios.post(`${baseURL}auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setErrMsg(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout welcomeTitle="Welcome Back.">
      <div className="user-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
      </div>
      
      {errMsg && <p className="error-message">{errMsg}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button" disabled={isLoading}>
          {isLoading ? 'Logging In...' : 'Log In'}
        </button>
        
        <div className="auth-options">
          <label htmlFor="remember" className="remember-me">
            <input type="checkbox" id="remember" />
            Remember me
          </label>
          <div className="auth-switch-link">
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
