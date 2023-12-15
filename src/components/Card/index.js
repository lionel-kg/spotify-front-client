import React, {useState, useEffect} from 'react';
import styles from './index.module.scss';
import {useRouter} from 'next/router';
import {FaPlay} from 'react-icons/fa';

const Index = props => {
  const {song} = props;
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleCard = e => {
    e.preventDefault();
    router.push(props.href);
  };

  return (
    <div
      className={styles.card}
      onClick={e => handleCard(e)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.container_img}>
        <img src={song.album.thumbnail} alt={song.album.title} />
        {isHovered && (
          <button className={styles.play_button}>
            <FaPlay />
          </button>
        )}
      </div>
      <p className={styles.name}>{song.title}</p>
      <p className={styles.artist}>{song.artist.name}</p>
    </div>
  );
};
export default Index;
