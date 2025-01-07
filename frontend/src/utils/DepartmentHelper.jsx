import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    console.log("Deleting department with ID:", id); // Log the ID
    if (!id) {
      console.error("ID is undefined. Check the props being passed.");
      return;
    }

    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          alert('Department deleted successfully.');
          onDepartmentDelete(id); // Update parent state or refetch list
        }
      } catch (error) {
        alert(error.response?.data?.error || 'Failed to delete department.');
      }
    }
  };


  DepartmentButtons.propTypes = {
    id: PropTypes.string.isRequired, // or PropTypes.number if `id` is a number
    onDepartmentDelete: PropTypes.func.isRequired,
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-purple-900 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};
