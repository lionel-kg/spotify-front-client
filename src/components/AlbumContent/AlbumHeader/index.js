import React from 'react';
import styles from './index.module.scss';
import Title from '@/components/Title';

const Index = ({album}) => {
  const formatDuration = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}m ${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = formatDuration(
    album?.audios?.reduce((total, audio) => {
      return total + audio.duration;
    }, 0),
  );

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
