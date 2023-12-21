// components/Discography.js
import React from 'react';
import styles from './index.module.scss';

const Index = ({albums}) => {
  return (
    <section className={styles.discography}>
      <h2>Discographie</h2>
      <div className={styles.albumList}>
        {albums?.map(album => (
          <div key={album.id} className={styles.albumItem}>
            <img
              src={album.cover}
              alt={album.title}
              className={styles.albumCover}
            />
            <div className={styles.albumInfo}>
              <span className={styles.albumTitle}>{album.title}</span>
              <span className={styles.albumYear}>{album.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Index;
