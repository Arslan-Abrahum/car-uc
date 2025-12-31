// pages/Forbidden.jsx
import { useNavigate } from 'react-router-dom'
import { FaLock, FaArrowLeft,  } from 'react-icons/fa6'
import { FaExclamationTriangle, FaHome } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Forbidden = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogoutAndLogin = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-red-900 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {/* Animated Error Icon */}
        <div className="relative mb-8">
          <div className="w-40 h-40 mx-auto bg-red-500/10 rounded-full animate-ping"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <FaLock className="text-red-400 text-6xl" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                <FaExclamationTriangle className="text-white text-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-5xl font-bold text-white mb-4">403 Forbidden</h1>
        <h2 className="text-3xl font-bold text-red-400 mb-6">Access Denied</h2>
        <p className="text-gray-300 text-lg mb-8">
          You don't have permission to access this resource. Your session may have expired or you lack proper authorization.
        </p>

        {/* Instructions */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <p className="text-gray-300 text-left">Ensure you're logged in with valid credentials</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <p className="text-gray-300 text-left">Check if your session has expired (auto-logout after 8h)</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <p className="text-gray-300 text-left">Contact administrator if issue persists</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleLogoutAndLogin}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <FaHome />
            <span>Login Again</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
          >
            <FaArrowLeft />
            <span>Go Back</span>
          </button>
        </div>

        {/* Security Info */}
        <div className="mt-8 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400">
            🔐 <span className="font-bold">Security Alert:</span> Unauthorized access attempts are logged. 
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Forbidden