import React from 'react'
import { useAuth } from '../../context/authContext.jsx';

const Navbar = () => {
  const {user} = useAuth()
  return (
    <div className='flex items-center justify-between h-12 bg-purple-900'>
      <p>Welcome {user.name}</p>
      <button>Logout</button>
    </div>
  )
}

export default Navbar