import React from 'react';
import styles from './index.module.scss';
import Title from '@/components/Title';

const Index = ({playlist}) => {
  return (
    <div className={styles.playlistHeader}>
      <img
        src={playlist?.imageUrl}
        alt={playlist?.title}
        className={styles.playlistImage}
      />
      <div className={styles.playlistDetails}>
        <Title type="h2" className={styles.playlistTitle}>
          {playlist?.title}
        </Title>
        <p className={styles.playlistArtist}>{playlist?.artist}</p>
        <p className={styles.playlistStats}>
          {playlist?.tracks?.length} titres
        </p>
      </div>
    </div>
  );
};

export default Index;
