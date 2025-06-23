import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Layout from './Components/Layouts/Layout';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute';
import { getCurrentUser } from './Components/utils/auth';
import Signup from './Components/Login/Signup';

function Main() {
  const [isInvestModalOpen, setInvestModalOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout onInvestClick={() => setInvestModalOpen(true)}>
                <Dashboard isInvestModalOpen={isInvestModalOpen}  onClose={() => setInvestModalOpen(false)} />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Main