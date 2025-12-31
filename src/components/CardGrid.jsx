import CardItem from "./CardItem"

const CardGrid = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} onClick={onCardClick} />
      ))}
    </div>
  )
}

export default CardGrid
