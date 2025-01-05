import React from 'react'
import { useAuth } from '../../context/authContext.jsx';

const Navbar = () => {
  const {user} = useAuth()
  return (
    <div className='flex items-center text-white justify-between h-12 bg-purple-900 px-5'>
      <p>Welcome {user.name}</p>
      <button className='px-4 py-1 bg-purple-900 hover:bg-violet-500'>Logout</button>
    </div>
  )
}

export default Navbar