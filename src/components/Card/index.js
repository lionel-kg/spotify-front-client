import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { FaPlay } from 'react-icons/fa';

const Index = ({ title, name, thumbnail, subtitle, album }) => {

  const displayTitle = title || name;
  const displayThumbnail = album?.thumbnail || thumbnail;
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // const handleCard = e => {
  //   e.preventDefault();
  //   router.push(props.href);
  // };

  return (
    <div
      className={styles.card}
      onClick={e => handleCard(e)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.container_img}>
        <img src={displayThumbnail} alt={displayTitle} />
        {isHovered && (
          <button className={styles.play_button}>
            <FaPlay />
          </button>
        )}
      </div>
      <p className={styles.name}>{displayTitle}</p>
      <p>Test</p>
      <p className={styles.artist}>{subtitle}</p>
    </div>
  );
};
export default Index;
