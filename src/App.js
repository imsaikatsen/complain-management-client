import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import CreateTicket from './components/CreateTicket';
import EditTicket from './pages/EditTicket';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import TicketReplyView from './components/TicketReplyView';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const handleRedirect = () => {
    if (isAuthenticated) {
      if (userRole === 'admin') return '/admin-dashboard';
      if (userRole === 'customer') return '/customer-dashboard';
    }
    return '/login';
  };

  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          {/* Redirect root URL based on authentication */}
          <Route path="/" element={<Navigate to={handleRedirect()} />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Role-Based Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/tickets/:id" element={<TicketReplyView />} />
          <Route
            path="/customer-dashboard/create"
            element={
              <ProtectedRoute requiredRole="customer">
                <CreateTicket />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer-dashboard/edit/:id"
            element={
              <ProtectedRoute requiredRole="customer">
                <EditTicket />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
