const Index = ({ track }) => {
  return (
    <div className="track">
      <p>{track.title}</p>
      <p>{track.artist.name}</p>
    </div>
  );
};

export default Index;