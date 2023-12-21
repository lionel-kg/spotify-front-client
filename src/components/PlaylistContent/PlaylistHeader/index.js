import React, {useEffect} from 'react';
import styles from './index.module.scss';
import Title from '@/components/Title';
import {usePlayer} from '@/context/PlayerContext';

const Index = ({playlist}) => {
  const {indexPlaylist} = usePlayer();
  useEffect(() => {
    console.log('indexPlaylist', indexPlaylist);
    console.log(playlist);
  }, [indexPlaylist]);
  return (
    <div className={styles.playlistHeader}>
      <img
        src={playlist?.audios[indexPlaylist].thumbnail}
        alt={playlist?.title}
        className={styles.playlistImage}
      />
      <div className={styles.playlistDetails}>
        <Title type="h2" className={styles.playlistTitle}>
          {playlist?.title}
        </Title>
        <p className={styles.playlistArtist}>{playlist?.artist}</p>
        <p className={styles.playlistStats}>
          {playlist?.audios[indexPlaylist].title}
        </p>
      </div>
    </div>
  );
};

export default Index;
