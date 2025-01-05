import React from 'react';
import { useAuth } from '../context/authContext.jsx';
import AdminSidebar from '../components/dashboard/AdminSidebar.jsx';
import Navbar from '../components/dashboard/Navbar.jsx';

const AdminDashboard = () => {
  const { user } = useAuth();




  return (
    <div className = 'flex'>
      <AdminSidebar/>
      <div className = 'flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar/>
      </div>
    </div>
  );
};

export default AdminDashboard;
