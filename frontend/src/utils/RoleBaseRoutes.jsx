import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return user ? children : <Navigate to="/login" />;
};

RoleBaseRoutes.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoleBaseRoutes;
