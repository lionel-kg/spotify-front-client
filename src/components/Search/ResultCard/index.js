const Index = ({ title, name, thumbnail, subtitle }) => {

  const displayTitle = title || name;

  return (
    <div>
      <img src={thumbnail} alt={title} />
      <h3>{displayTitle}</h3>
      <p>{subtitle}</p>
    </div>
  );
};

export default Index;