// components/ProtectedRoute.jsx - UPDATED
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()
  const [isValidSession, setIsValidSession] = useState(true)

  // Check session validity
  useEffect(() => {
    const checkSession = () => {
      try {
        const loginTime = localStorage.getItem('loginTime')
        if (loginTime) {
          const loginDate = new Date(loginTime)
          const now = new Date()
          const hoursDiff = Math.abs(now - loginDate) / 36e5 // hours difference
          
          // Auto logout after 8 hours (for demo)
          if (hoursDiff > 8) {
            localStorage.removeItem('isAuthenticated')
            localStorage.removeItem('authToken')
            setIsValidSession(false)
          }
        }
      } catch (error) {
        console.error('Session check error:', error)
      }
    }

    checkSession()
  }, [location])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !isValidSession) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute