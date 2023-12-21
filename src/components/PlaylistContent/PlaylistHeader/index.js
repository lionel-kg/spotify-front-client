import React from 'react';
import styles from './index.module.scss';
import Title from '@/components/Title';

const Index = ({playlist}) => {
  return (
    <div className={styles.playlistHeader}>
      <img
        src={playlist?.imageUrl}
        alt={playlist?.name}
        className={styles.playlistImage}
      />
      <div className={styles.playlistDetails}>
        <Title type="h2" className={styles.playlistTitle}>
          {playlist?.name}
        </Title>
        <p className={styles.playlistStats}>
          {playlist?.audios?.length} titres
        </p>
      </div>
    </div>
  );
};

export default Index;
