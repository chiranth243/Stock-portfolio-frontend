import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Layout from './Components/Layouts/Layout';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute';
import { getCurrentUser } from './Components/utils/auth';
import Signup from './Components/Login/Signup';

function Main() {
  const [isInvestModalOpen, setInvestModalOpen] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
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