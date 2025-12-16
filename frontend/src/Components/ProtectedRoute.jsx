import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { serverURL } from '../App'

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${serverURL}/api/user/getallfoods`,
          { withCredentials: true }
        )
        // If request succeeds, user is authenticated
        setIsAuthenticated(true)
      } catch (error) {
        // If request fails, user is not authenticated
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/userlogin" replace />
  }

  // If authenticated, render the component
  return children
}

export default ProtectedRoute
