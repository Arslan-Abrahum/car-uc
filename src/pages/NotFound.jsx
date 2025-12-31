import { useNavigate } from 'react-router-dom'
import { FaLock, FaArrowLeft } from 'react-icons/fa6'
import { FaExclamationTriangle, FaHome } from 'react-icons/fa'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {/* Animated Error Icon */}
        <div className="relative mb-8">
          <div className="w-40 h-40 mx-auto bg-rose-500/10 rounded-full animate-ping"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-rose-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <FaLock className="text-rose-400 text-6xl" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full animate-pulse flex items-center justify-center">
                <FaExclamationTriangle className="text-white text-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-5xl font-bold text-white mb-4">Access Restricted</h1>
        <h2 className="text-3xl font-bold text-rose-400 mb-6">404 - Authentication Required</h2>
        <p className="text-gray-300 text-lg mb-8">
          You must authenticate before accessing protected routes. Please return to the home page and enter your name.
        </p>

        {/* Steps */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
          <div className="space-y-4">
            {[
              'Navigate to the home page',
              'Click the "Enter Name" button',
              'Submit your name in the modal',
              'Access protected routes'
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{idx + 1}</span>
                </div>
                <p className="text-gray-300 text-left">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <FaHome />
            <span>Go to Home</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
          >
            <FaArrowLeft />
            <span>Go Back</span>
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-8 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400">
            🔒 <span className="font-bold">Security:</span> This application uses localStorage for session management. 
            All data remains on your device and is never transmitted externally.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound