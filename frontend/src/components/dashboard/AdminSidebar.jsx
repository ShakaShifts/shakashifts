import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaCogs, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { FaMoneyBill1Wave } from 'react-icons/fa6';

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className = "bg-purple-900 h-12 flex items-center justify-center">
        <h3 className = 'text-2x1 text-center font-pacific'>Employee MS</h3>
      </div>
      <div>
        <NavLink to="/admin-dashboard"
                 className={({ isActive }) =>
                   `${isActive ? "bg-purple-900" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
                 }>
          <FaTachometerAlt />

          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin-dashboard"
                 className = "flex items-center space-x-4 block py-2.5 px-4 rounded">
          <FaUsers/>
          <span>Employees </span>
        </NavLink>
        <NavLink to="/admin-dashboard"
                 className = "flex items-center space-x-4 block py-2.5 px-4 rounded">
          <FaBuilding/>
          <span>Departments </span>
        </NavLink>
        <NavLink to="/admin-dashboard"
                 className = "flex items-center space-x-4 block py-2.5 px-4 rounded">
          <FaCalendarAlt/>
          <span>Leave </span>
        </NavLink>
        <NavLink to="/admin-dashboard"
                 className = "flex items-center space-x-4 block py-2.5 px-4 rounded">
          <FaMoneyBill1Wave/>
          <span>Salary </span>
        </NavLink>
        <NavLink to="/admin-dashboard"
                 className = "flex items-center space-x-4 block py-2.5 px-4 rounded">
          <FaCogs/>
          <span>Settings </span>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminSidebar