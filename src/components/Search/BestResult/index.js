import styles from './index.module.scss';

const Index = ({ artist }) => {
  if (!artist) return null;

  return (
    <div className={styles.artist_highlight}>
      <h3>Meilleur résultat</h3>
      <div className={styles.artist_highlight_content}>
        <img src="https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png" alt={artist.name} />
        <h2>{artist.name}</h2>
        <p>Artiste</p>
      </div>
    </div>
  );
}

export default Index;