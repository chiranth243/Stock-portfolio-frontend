import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../http';
import AuthLayout from './AuthLayout';

export default function Signup() {
 const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await axios.post(`${baseURL}auth/signup`, form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AuthLayout welcomeTitle="Join Us.">
      <div className="user-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" /></svg>
      </div>

      {error && <p className="error-message">{error}</p>}
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text" name="name" className="form-input" placeholder="Full Name"
            value={form.name} onChange={handleChange} required
          />
        </div>
        <div className="input-group">
          <input
            type="email" name="email" className="form-input" placeholder="Email"
            value={form.email} onChange={handleChange} required
          />
        </div>
        <div className="input-group">
          <input
            type="password" name="password" className="form-input" placeholder="Password"
            value={form.password} onChange={handleChange} required
          />
        </div>
        <button type="submit" className="auth-button" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="auth-options">
          <div></div> {/* Empty div for alignment */}
          <div className="auth-switch-link">
             <Link to="/signin">Already a member?</Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
