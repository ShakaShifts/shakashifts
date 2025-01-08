import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper.jsx';
import DataTable from 'react-data-table-component';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/employee/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log(response.data); // Debugging the response

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toDateString(),
            profileImage: emp.userId.profileImage,
            action: <EmployeeButtons id={emp._id} />,
          }));
          setEmployees(data);
        }
      } catch (error) {
        console.log(error)
        console.error(error.response);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };


    fetchEmployees();
  }, []);


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredEmployees = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchValue)
    );
    setEmployees(filteredEmployees);
  };


  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Employee Name"
          className="px-4 py-0.5 border"
          onChange={handleSearch}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-purple-900 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div>
        <DataTable columns={columns} data={employees} progressPending={empLoading} />
      </div>
    </div>
  );
};

export default List;
