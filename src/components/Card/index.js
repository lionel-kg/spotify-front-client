import React, { useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { FaPlay } from 'react-icons/fa';
import { usePlayer } from '@/context/PlayerContext';

const Index = ({ title, name, thumbnail, artist, album, audios, url, id }) => {
  const { handlePlay, playlist } = usePlayer();
  const displayTitle = title || name;
  const displayThumbnail = album?.thumbnail || thumbnail;
  const diplayArtist = artist || "";
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const onPlay = (e) => {
    e.stopPropagation();
    handlePlay(audios, url, displayThumbnail, displayTitle, diplayArtist, id);
  };

  const handleCard = (e) => {
    e.preventDefault();
    // Implement navigation or other logic here
    // router.push(props.href); // Adjust with your actual navigation logic
  };

  return (
    <div
      className={styles.card}
      onClick={handleCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.container_img}>
        <img src={displayThumbnail} alt={displayTitle} />
        {isHovered && (
          <button className={styles.play_button} onClick={onPlay}>
            <FaPlay />
          </button>
        )}
      </div>
      <p className={styles.name}>{displayTitle}</p>
      <p className={styles.artist}>{artist?.name}</p>
    </div>
  );
};

export default Index;