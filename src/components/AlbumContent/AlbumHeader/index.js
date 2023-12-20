import React from 'react';
import styles from './index.module.scss';
import Title from '@/components/Title';

const Index = ({album}) => {
  const totalDuration = album?.audios?.reduce((total, audio) => {
    return total + audio.duration;
  }, 0);

  return (
    <div className={styles.albumHeader}>
      <img
        src={album?.thumbnail}
        alt={album?.title}
        className={styles.albumImage}
      />
      <div className={styles.albumDetails}>
        <Title type="h2" className={styles.albumTitle}>
          {album?.title}
        </Title>
        <p className={styles.albumArtistYear}>{album?.artist?.name}</p>
        <p className={styles.albumStats}>
          {album?.audios.length} titres, {totalDuration}
        </p>
      </div>
    </div>
  );
};

export default Index;
