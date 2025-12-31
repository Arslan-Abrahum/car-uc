// pages/FailedJourney.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaCar, FaFilter } from 'react-icons/fa6'
import CardGrid from '../components/CardGrid'
import PlayerIDModal from '../components/PlayerIDModal'

const FailedJourney = () => {
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const navigate = useNavigate()

  const vehicleCards = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    name: `Vehicle ${String.fromCharCode(65 + i)}`,
    type: ['SUV', 'Sedan', 'Truck', 'Sports', 'Coupe', 'Convertible', 'Van', 'Electric'][i % 8],
    price: `$${(25000 + i * 5000).toLocaleString()}`,
    year: 2020 + (i % 5),
    color: `from-blue-${400 + (i % 6) * 100}/20 to-indigo-${400 + (i % 6) * 100}/20`,
  }))

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setShowPlayerModal(true)
    localStorage.setItem('selectedVehicle', JSON.stringify(card))
  }

  const handlePlayerIdSubmit = (playerId) => {
    localStorage.setItem('playerId', playerId)
    localStorage.setItem('journeyType', 'failed')
    setShowPlayerModal(false)
    navigate('/order-details/failed')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors border border-white/20"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Failed Journey Portal</h1>
            <p className="text-blue-200/80">Select a vehicle and complete the order process</p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <FaFilter />
            <span>16 Vehicles</span>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Selection', value: '1 Required', icon: '🎯' },
            { label: 'Average Price', value: '$52,500', icon: '💰' },
            { label: 'Success Rate', value: '0% Expected', icon: '📊' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-blue-200/70 text-sm">{stat.label}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Card Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Available Vehicles</h2>
            <div className="text-sm text-blue-200/70">
              8 cards per row • Click to select
            </div>
          </div>
          <CardGrid cards={vehicleCards} onCardClick={handleCardClick} />
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-800/30 to-indigo-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FaCar className="text-blue-300 text-2xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Process Flow</h3>
              <p className="text-blue-200/80">Follow these steps to complete your order</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Select Vehicle', desc: 'Choose from 16 options' },
              { step: '02', title: 'Enter Player ID', desc: 'Provide identification' },
              { step: '03', title: 'Review Order', desc: 'Confirm all details' },
              { step: '04', title: 'Get Status', desc: 'Receive final outcome' }
            ].map((item) => (
              <div key={item.step} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-blue-300 font-bold text-lg mb-2">{item.step}</div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-sm text-blue-200/70">{item.desc}</p>
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

export default FailedJourney