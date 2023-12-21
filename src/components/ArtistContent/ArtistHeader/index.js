import React from 'react';
import styles from './index.module.scss';
import Title from '@/components/Title';
import {FaPlay, FaPause, FaHeart, FaRegHeart} from 'react-icons/fa';
import {usePlaylists} from '@/context/PlaylistContext';
import {usePlayer} from '@/context/PlayerContext';

const Index = ({artist}) => {
  const {artists, addArtist, removeArtist, artistExists} = usePlaylists();

  const isArtistLiked = artistExists(artist.id);

  const toggleArtistLike = () => {
    if (isArtistLiked) {
      removeArtist(artist.id);
    } else {
      addArtist(artist);
    }
  };

  return (
    <div className={styles.artistHeader}>
      {/* <img
        src={artist.backgroundImage}
        alt={artist.name}
        className={styles.backgroundImage}
      /> */}
      <div className={styles.artistInfo}>
        <Title type="h1" className={styles.artistName}>
          {artist.name}
        </Title>
      </div>

      {isArtistLiked ? (
        <FaHeart
          className={`${styles.iconHeart} ${styles.liked}`}
          onClick={toggleArtistLike}
        />
      ) : (
        <FaRegHeart className={styles.iconHeart} onClick={toggleArtistLike} />
      )}
    </div>
  );
};

export default Index;
