import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    sortable: true
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];
export const fetchDepartments = async () => {
  let departments

  try {
    const response = await axios.get('http://localhost:5000/api/department/add', {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success){
      departments = response.data.departments


    }
  } catch(error){
    if (error.response && !error.response.data.success){
      alert(error.response.data.error)
    }
  }
  return departments
};

export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();



  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-blue-900 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-green-500 text-white"
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-500 text-white"
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white"
      >
        Leave
      </button>

    </div>
  );
};
