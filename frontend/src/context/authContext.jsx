import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create the context
const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    const verifyUser = async() => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/verify', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response)
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null)
          setLoad(false)
        }
      }
      catch(error){
        console.log(error)
        if (error.response && !error.response.data.error){
          setUser(null)
        }
      } finally{
        setLoad(false)
      }
    }
    verifyUser()
  }, []);
  // Login function
  const login = (user) => {
    setUser(user);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(userContext);

export default AuthContext;
