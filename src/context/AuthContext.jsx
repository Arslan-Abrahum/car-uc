// context/AuthContext.jsx - UPDATED
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userName = localStorage.getItem('userName')
        const isAuthenticated = localStorage.getItem('isAuthenticated')
        const authToken = localStorage.getItem('authToken')
        
        if (userName && isAuthenticated === 'true' && authToken) {
          setAuthState({
            user: { username: userName },
            isAuthenticated: true,
            isLoading: false
          })
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        })
      }
    }

    checkAuth()
  }, [])

  const login = useCallback((username) => {
    // Create a simple token for demo purposes
    const authToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    localStorage.setItem('userName', username)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('authToken', authToken)
    localStorage.setItem('loginTime', new Date().toISOString())
    
    setAuthState({
      user: { username },
      isAuthenticated: true,
      isLoading: false
    })
    
    return authToken
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('userName')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('authToken')
    localStorage.removeItem('loginTime')
    localStorage.removeItem('selectedVehicle')
    localStorage.removeItem('playerId')
    localStorage.removeItem('journeyType')
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    })
  }, [])

  const updateUser = useCallback((userData) => {
    localStorage.setItem('userName', userData.username)
    setAuthState(prev => ({
      ...prev,
      user: { ...prev.user, ...userData }
    }))
  }, [])

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}