import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Layout from './Components/Layouts/Layout';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute';
import CreatePortfolio from './Components/Portfolio/CreatePortfolio';
import { getCurrentUser } from './Components/utils/auth';
import Signup from './Components/Login/Signup';

function Main() {
  const token = localStorage.getItem('token');
  const user = getCurrentUser();
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/create-portfolio"
          element={
            <PrivateRoute>
              <Layout>
                <CreatePortfolio token={token} userId={user} />
              </Layout>
            </PrivateRoute>}
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Main