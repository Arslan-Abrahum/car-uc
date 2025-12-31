import { useState } from 'react'
import { FaXmark, FaIdCard } from 'react-icons/fa6'
import { LuShieldCheck } from "react-icons/lu";

const PlayerIDModal = ({ isOpen, onClose, onSubmit, vehicleName }) => {
  const [playerId, setPlayerId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!playerId.trim()) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    onSubmit(playerId)
    setIsSubmitting(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className=" rounded-2xl max-w-lg w-full border border-white/20 animate-in fade-in zoom-in-95">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                <FaIdCard className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Player ID</h2>
                <p className="text-blue-200/80">For: {vehicleName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              <FaXmark className="text-gray-300" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-gray-300 mb-3 font-medium">
                Enter Your Player ID Number
              </label>
              <input
                type="text"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g., PLR-123456"
                required
                disabled={isSubmitting}
              />
              <p className="mt-2 text-sm text-gray-400">
                This unique ID will be linked to your vehicle selection
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-white/20 text-gray-300 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <LuShieldCheck />
                    Save & Continue
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <LuShieldCheck className="text-green-400" />
              </div>
              <div>
                <p className="font-medium text-white">Secure Processing</p>
                <p className="text-sm text-gray-400">
                  Your Player ID is encrypted and stored locally
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerIDModal