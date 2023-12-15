import React, { useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { FaPlay } from 'react-icons/fa';
import { usePlayer } from '@/context/PlayerContext'; // Adjust the path as necessary

const Index = ({ title, name, thumbnail, subtitle, artist, album, audios, url }) => {
  const { updatePlaylist, playlist } = usePlayer();
  const displayTitle = title || name;
  const displayThumbnail = album?.thumbnail || thumbnail;
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (Array.isArray(audios) && audios.length) {
      updatePlaylist(audios);
    }
    else if (url) {
      const singleSong = {
        title: title || 'Unknown Title', // Adjust with the actual property names
        artist: subtitle || 'Unknown Artist',
        url: url,
        thumbnail: thumbnail,
      };
      updatePlaylist([singleSong]);
    }
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
          <button className={styles.play_button} onClick={handlePlay}>
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