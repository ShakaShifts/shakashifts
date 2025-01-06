import React from 'react';
import { useAuth } from '../context/authContext.jsx';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading ....</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired
}

export default PrivateRoutes;
