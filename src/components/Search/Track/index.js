import React, { useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import Image from 'next/image'
import styles from './index.module.scss';
import { FaPlay, FaPause } from "react-icons/fa6";

const Index = ({ track }) => {
  const { handlePlay, updatePlaylist, indexPlaylist, playlist, isPlaying, setIsPlaying } = usePlayer();
  const [isHovered, setIsHovered] = useState(false);

  const onPlay = (e) => {
    e.stopPropagation();
    handlePlay(null, track.url, track.album.thumbnail, track.title, track.artist, track.id);
  };

  return (
    <div
      className={`${styles.track} ${isHovered && styles.hovered}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.image_container}>
        <Image
          src={track.album.thumbnail}
          width={50}
          height={50}
          alt="image"
          loading='lazy'
        />
        {isHovered && playlist[indexPlaylist]?.id != track.id && (
          <button
            className={styles.play_icon}
            onClick={onPlay}
          >
            <FaPlay size={25} color='white' />
          </button>
        )}

        {isHovered && playlist[indexPlaylist]?.id == track.id && isPlaying && (
          <button
            className={styles.play_icon}
            onClick={() => setIsPlaying(false)}
          >
            <FaPause size={25} color='white' />
          </button>
        )}
      </div>
      <div className={styles.track_info}>
        <p>{track.title}</p>
        <p className={styles.artist}>{track.artist.name}</p>
      </div>
    </div >
  );
};

export default Index;