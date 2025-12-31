// App.jsx - UPDATED WITH LOGIN
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import FailedJourney from './pages/FailedJourney'
import SuccessfulJourney from './pages/SuccessfulJourney'
import OrderDetails from './pages/OrderDetails'
import StatusPage from './pages/StatusPage'
import NotFound from './pages/NotFound'
import Forbidden from './pages/Forbidden'

// Create a Public Route wrapper that redirects authenticated users
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  
  if (isAuthenticated) {
    // Redirect authenticated users away from login page
    return <Navigate to="/" state={{ from: location }} replace />
  }
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes - Only accessible when NOT logged in */}
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          
          {/* Protected Routes - Require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/failed-journey" element={<FailedJourney />} />
            <Route path="/successful-journey" element={<SuccessfulJourney />} />
            <Route path="/order-details/:type" element={<OrderDetails />} />
            <Route path="/status/:type" element={<StatusPage />} />
          </Route>
          
          {/* Error Pages */}
          <Route path="/404" element={<NotFound />} />
          <Route path="/forbidden" element={<Forbidden />} />
          
          {/* Catch all route - Redirect to login if not authenticated */}
          <Route path="*" element={
            <Navigate to="/login" replace />
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App