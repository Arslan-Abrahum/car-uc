
const CardItem = ({ card, onClick }) => {
    
  return (
    <button
      onClick={() => onClick(card)}
      className="group relative bg-transparent backdrop-blur-sm rounded-xl p-4 text-left border border-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
    >
      <div className="relative z-10">
        <div className="h-32 rounded-lg mb-4 flex items-center justify-center transition-colors">
          <img src={card.image} className="text-white/80 text-4xl" />
        </div>
        <div className="mt-4 pt-3 border-white/10">
          <div className="w-full py-2 text-white font-bold rounded-lg text-md text-center">
            {card.values}
          </div>
        </div>
      </div>
    </button>
  )
}

export default CardItem