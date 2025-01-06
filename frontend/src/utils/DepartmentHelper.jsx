export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name
  },
  {
    name: "Action",
    selector: (row) => row.action
  },
]

export const DepartmentButtons = () => {
  return (
    <div className = "flex space-x-3">
      <button className = "px-3 py-1 bg-purple-900 text-white">Edit</button>
      <button className = "px-3 py-1 bg-red-500 text-white">Delete</button>
    </div>
  )
}

