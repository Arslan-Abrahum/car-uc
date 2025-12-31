// pages/StatusPage.jsx
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {    
  FaClock,
} from 'react-icons/fa6'
import { FaCheckCircle, FaHome, FaRedo, FaTimesCircle } from 'react-icons/fa'
import { LuShieldCheck } from 'react-icons/lu'


const StatusPage = () => {
  const { type } = useParams()
  const navigate = useNavigate()
  const isSuccess = type === 'successful'

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('lastStatus', type)
      navigate('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate, type])

  const config = isSuccess ? {
    gradient: 'from-emerald-400 to-green-600',
    icon: FaCheckCircle,
    iconColor: 'text-emerald-100',
    title: 'Order Successful! 🎉',
    message: 'Your order has been processed and completed successfully.',
    details: 'All systems confirmed. Your vehicle order is now complete.',
    bgRing: 'bg-emerald-500/20'
  } : {
    gradient: 'from-rose-400 to-red-600',
    icon: FaTimesCircle,
    iconColor: 'text-rose-100',
    title: 'Order Failed ⚠️',
    message: 'There was an issue processing your order.',
    details: 'Please try again or contact support for assistance.',
    bgRing: 'bg-rose-500/20'
  }

  const Icon = config.icon

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.gradient} flex flex-col items-center justify-center p-6`}>
      <div className="max-w-lg w-full text-center">
        {/* Animated Status Icon */}
        <div className="relative mb-8">
          <div className={`w-48 h-48 mx-auto ${config.bgRing} rounded-full animate-ping`}></div>
          <div className={`w-40 h-40 mx-auto ${config.bgRing} rounded-full animate-ping`} style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Icon className={`text-6xl ${config.iconColor}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <h1 className="text-4xl font-bold text-white mb-4">{config.title}</h1>
        <p className="text-xl text-white/90 mb-6">{config.message}</p>
        <p className="text-white/80 mb-8">{config.details}</p>

        {/* Order Details Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/30">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-left">
              <p className="text-sm text-white/80">Order ID</p>
              <p className="font-bold text-white">ORD-{Date.now().toString().slice(-8)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">Status</p>
              <p className={`font-bold ${isSuccess ? 'text-emerald-200' : 'text-rose-200'}`}>
                {isSuccess ? 'COMPLETED' : 'FAILED'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-white/80">
            <FaClock className="animate-pulse" />
            <span>Redirecting to home page in 5 seconds...</span>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-3 mb-8 text-white/80">
          <LuShieldCheck />
          <span>All data has been securely stored locally</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center justify-center gap-2 py-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors text-white"
          >
            <FaHome />
            <span>Go Home</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>
          <button
            onClick={() => navigate(isSuccess ? '/successful-journey' : '/failed-journey')}
            className="group flex items-center justify-center gap-2 py-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors text-white"
          >
            <FaRedo />
            <span>Try Again</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">↻</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default StatusPage