import React from 'react';
import styles from './index.module.scss';

const Index = ({artist}) => {
  return (
    <div className={styles.artistHeader}>
      <img
        src={artist.backgroundImage}
        alt={artist.name}
        className={styles.backgroundImage}
      />
      <div className={styles.artistInfo}>
        <div className={styles.verifiedBadge}>Artiste vérifié</div>
        <h1 className={styles.artistName}>{artist.name}</h1>
      </div>
    </div>
  );
};

export default Index;
