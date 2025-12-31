// pages/SuccessfulJourney.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaCar, FaFilter } from 'react-icons/fa6'
import CardGrid from '../components/CardGrid'
import PlayerIDModal from '../components/PlayerIDModal'
import { vehicleCards } from '../data/vehicle'

const SuccessfulJourney = () => {
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const navigate = useNavigate()

//   const vehicleCards = Array.from({ length: 16 }, (_, i) => ({
//     id: i + 1,
//     name: `Premium ${String.fromCharCode(65 + i)}`,
//     type: ['Luxury SUV', 'Executive Sedan', 'Sports Coupe', 'Electric'][i % 4],
//     price: `$${(75000 + i * 8000).toLocaleString()}`,
//     year: 2024,
//     color: `from-emerald-${400 + (i % 6) * 100}/20 to-green-${400 + (i % 6) * 100}/20`,
//   }))

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setShowPlayerModal(true)
    localStorage.setItem('selectedVehicle', JSON.stringify(card))
  }

  const handlePlayerIdSubmit = (playerId) => {
    localStorage.setItem('playerId', playerId)
    localStorage.setItem('journeyType', 'successful')
    setShowPlayerModal(false)
    navigate('/order-details/successful')
  }

  return (
    <div className="main-container min-h-screen text-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all border border-emerald-200 shadow-sm"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>
          
          {/* <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaRocket className="text-emerald-600" />
              <h1 className="text-4xl font-bold">Successful Journey</h1>
            </div>
            <p className="text-emerald-700/80">Experience seamless order processing</p>
          </div> */}
          
          <div className="flex  items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-200 shadow-sm">
            <FaFilter />
            <span>Premium Selection</span>
          </div>
        </header>

        {/* Card Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 px-3">
            <h2 className="text-2xl font-bold text-white">Premium Vehicles</h2>
            <div className="text-sm text-gray-200">
              16 premium options • Click to select
            </div>
          </div>
          <CardGrid cards={vehicleCards} onCardClick={handleCardClick} />
        </div>

        {/* Success Features */}
        <div className="bg-transparent backdrop-blur-sm rounded-2xl p-8 border border-white shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <FaCar className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">Guaranteed Success Features</h3>
              <p className="text-gray-300">Everything you need for a perfect order</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { feature: 'Instant Processing', desc: 'No waiting time' },
              { feature: 'Secure Payments', desc: 'Bank-level security' },
              { feature: 'Real-time Updates', desc: 'Live status tracking' },
              { feature: '24/7 Support', desc: 'Always available' }
            ].map((item, idx) => (
              <div key={idx} className="bg-transparent rounded-xl p-6 shadow-xl border border-white">
                <div className="text-white font-bold text-lg mb-2">{item.feature}</div>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PlayerIDModal
        isOpen={showPlayerModal}
        onClose={() => setShowPlayerModal(false)}
        onSubmit={handlePlayerIdSubmit}
        vehicleName={selectedCard?.name}
      />
    </div>
  )
}

export default SuccessfulJourney