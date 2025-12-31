import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  FaCheck, 
  FaXmark, 
  FaCalendar, 
  FaUser, 
  FaCar, 
  FaIdCard,
  FaReceipt,
  FaPaperPlane
} from 'react-icons/fa6'
import Loader from '../components/Loader'

const OrderDetails = () => {
  const { type } = useParams()
  console.log(type); 
  
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    const storedVehicle = JSON.parse(localStorage.getItem('selectedVehicle') || '{}')
    const playerId = localStorage.getItem('playerId')
    const playerName = localStorage.getItem('user-name')

    if (!storedVehicle.id || !playerId) {
      navigate('/')
      return
    }

    setOrderData({
      vehicle: storedVehicle,
      playerId,
      playerName,
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      orderId: `ORD-${Date.now().toString().slice(-8)}-${type.slice(0, 3).toUpperCase()}`,
    })
  }, [type, navigate])

  const handleSendNow = async () => {
    setIsProcessing(true)
    setShowLoader(true)
    
    // Store order data
    localStorage.setItem('lastOrder', JSON.stringify(orderData))
    localStorage.setItem('orderStatus', 'processing')
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    setShowLoader(false)
    navigate(`/status/${type}`)
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  const isFailed = type === 'failed'
  const theme = isFailed 
    ? {
        gradient: 'from-rose-50 to-red-50',
        border: 'border-rose-200',
        button: 'from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700',
        iconBg: 'bg-rose-100',
        iconColor: 'text-rose-600',
        accent: 'text-rose-600'
      }
    : {
        gradient: 'from-emerald-50 to-green-50',
        border: 'border-emerald-200',
        button: 'from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        accent: 'text-emerald-600'
      }

  return (
    <>
      {showLoader && <Loader type={type} />}
      
      <div className={`min-h-screen bg-gradient-to-br ${theme.gradient}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className={`bg-white rounded-3xl shadow-2xl p-8 ${theme.border} border-2`}>
              <div className="grid lg:grid-cols-2 gap-8">
                
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 ${theme.iconBg} rounded-xl`}>
                        <FaCar className={`${theme.iconColor} text-xl`} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Selected Vehicle</h2>
                    </div>
                    
                    <div className={`relative h-64 ${orderData.vehicle.color} rounded-2xl overflow-hidden mb-6`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img src={orderData.vehicle.image} className="text-white/20 h-full" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white">{orderData.vehicle.title}</h3>
                        <p className="text-white/80">{orderData.vehicle.values}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: 'Vehicle Name', value: orderData.vehicle.title },
                        { label: 'Vehicle Type', value: orderData.vehicle.id },
                        { label: 'Price', value: <span className="font-bold text-green-600">{orderData.vehicle.values}</span> }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between py-3 border-b border-gray-200 last:border-0">
                          <span className="text-gray-600">{item.title}</span>
                          <span className="font-medium text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                 
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${theme.iconBg} rounded-xl`}>
                        <FaReceipt className={`${theme.iconColor} text-xl`} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Order Information</h2>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className={`p-3 ${theme.iconBg} rounded-lg`}>
                          <FaIdCard className={`${theme.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Player ID</p>
                          <p className="font-bold text-lg text-gray-900">{orderData.playerId}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className={`p-3 ${theme.iconBg} rounded-lg`}>
                          <FaUser className={`${theme.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Customer Name</p>
                          <p className="font-bold text-lg text-gray-900">{orderData.playerName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className={`p-3 ${theme.iconBg} rounded-lg`}>
                          <FaCalendar className={`${theme.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Order Date & Time</p>
                          <p className="font-bold text-lg text-gray-900">{orderData.date} • {orderData.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* Actions */}
                  <div className="pt-6">
                    <button
                      onClick={handleSendNow}
                      disabled={isProcessing}
                      className={`w-full py-4 text-white rounded-2xl font-bold text-lg bg-gradient-to-r ${theme.button} transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing Order...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Send Order Now
                        </>
                      )}
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <button
                        onClick={() => navigate('/')}
                        className="py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Cancel Order
                      </button>
                      <button
                        onClick={() => navigate(`/${type}-journey`)}
                        className="py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Change Vehicle
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order ID Footer */}
              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-bold text-gray-900">{orderData.orderId}</p>
                  </div>
                  {/* <div className="text-sm text-gray-600">
                    All data is stored locally on your device
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetails