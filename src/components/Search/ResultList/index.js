import Card from "@/components/Card";

const Index = ({ title, cards, CardComponent }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className="card-container">
        {cards.map((card, index) => (
          <CardComponent key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

export default Index;