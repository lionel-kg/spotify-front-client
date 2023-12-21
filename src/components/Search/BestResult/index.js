import styles from './index.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Index = ({artist}) => {
  if (!artist) return null;

  return (
    <Link className={styles.listItem} href={`/artists/${artist.id}`}>
      <div className={styles.artist_highlight}>
        <h2>Meilleur résultat</h2>
        <div className={styles.artist_highlight_content}>
          <Image
            src="/bob.jpg"
            alt={artist.name}
            width={100}
            height={100}
            loading="lazy"
          />
          <h3>{artist.name}</h3>
          <p>Artiste</p>
        </div>
      </div>
    </Link>
  );
};

export default Index;
