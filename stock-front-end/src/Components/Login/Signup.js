import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Signup.module.css';
import baseURL from '../../http';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}auth/signup`, form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create account</h2>
        {error && <p className={styles.error}>{error}</p>}

        <input
          name="name" placeholder="Name" required
          value={form.name} onChange={handleChange}
        />
        <input
          name="email" type="email" placeholder="Email" required
          value={form.email} onChange={handleChange}
        />
        <input
          name="password" type="password" placeholder="Password" required
          value={form.password} onChange={handleChange}
        />

        <button type="submit">Sign Up</button>
        <p className={styles.signupText}>
          Have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
