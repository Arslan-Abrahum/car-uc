import { FaHourglassHalf } from 'react-icons/fa6'
import { FaCheckCircle, FaSync } from 'react-icons/fa'

const Loader = ({ type }) => {
  const isFailed = type === 'failed'
  
  const config = isFailed ? {
    gradient: 'from-rose-50 to-red-50',
    icon: FaSync,
    iconColor: 'text-rose-500',
    title: 'Processing Order',
    message: 'Validating your order details...'
  } : {
    gradient: 'from-emerald-50 to-green-50',
    icon: FaCheckCircle,
    iconColor: 'text-emerald-500',
    title: 'Completing Order',
    message: 'Finalizing your successful order...'
  }

  const Icon = config.icon

  return (
    <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center z-50`}>
      <div className="text-center max-w-md px-4">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className={`absolute inset-0 border-4 ${config.iconColor} border-t-transparent rounded-full animate-spin`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className={`text-4xl ${config.iconColor}`} />
            </div>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-white mb-3">{config.title}</h2>
        <p className="text-gray-300 mb-8">{config.message}</p>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-8 ${isFailed ? 'bg-rose-400' : 'bg-emerald-400'} rounded-full animate-bounce`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Loading Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full ${isFailed ? 'bg-gradient-to-r from-rose-500 to-red-500' : 'bg-gradient-to-r from-emerald-500 to-green-500'} animate-pulse`}
            style={{ width: '70%' }}
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-gray-300">
          <FaHourglassHalf className="animate-pulse" />
          <span>Please wait, this will take a moment...</span>
        </div>
      </div>
    </div>
  )
}

export default Loader