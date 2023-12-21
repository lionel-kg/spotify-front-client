import React, {useState} from 'react';
import {usePlayer} from '@/context/PlayerContext';
import Image from 'next/image';
import styles from './index.module.scss';
import {FaPlay, FaPause} from 'react-icons/fa6';

const Index = ({track}) => {
  const {
    handleSong,
    handlePause,
    handleResume,
    updatePlaylist,
    indexPlaylist,
    playlist,
    isPlaying,
    setIsPlaying,
    audioRef,
    isSongPlaying,
  } = usePlayer();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = e => {
    if (isSongPlaying(track.id)) {
      if (isPlaying) {
        handlePause(e);
      } else {
        handleResume(e);
      }
    } else {
      handleSong(
        track.url,
        track.album.thumbnail,
        track.title,
        track.artist,
        track.id,
      );
    }
  };

  return (
    <div
      className={`${styles.track} ${isHovered && styles.hovered}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.image_container}>
        <Image
          src={track.album.thumbnail}
          width={40}
          height={40}
          alt="image"
          loading="lazy"
        />
        {isHovered && (
          <button className={styles.play_icon} onClick={handleClick}>
            {isPlaying && isSongPlaying(track.id) ? (
              <FaPause color="white" />
            ) : (
              <FaPlay color="white" />
            )}
          </button>
        )}
      </div>
      <div className={styles.track_info}>
        <p className={`${isSongPlaying(track.id) && styles.title_playing}`}>
          {track.title}
        </p>
        <p className={styles.artist}>{track.artist.name}</p>
      </div>
    </div>
  );
};

export default Index;
