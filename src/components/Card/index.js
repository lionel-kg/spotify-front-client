import React, {useEffect} from 'react';
import styles from './index.module.scss';
import {useRouter} from 'next/router';

const Index = props => {
  const {song} = props;
  const router = useRouter();
  const handleCard = e => {
    e.preventDefault();
    router.push(props.href);
  };

  useEffect(() => {
    console.log(song);
  }, [song]);

  return (
    <div className={styles.card} onClick={e => handleCard(e)}>
      <div className={styles.container_img}>
        <img src={song.album.thumbnail} alt={song.album.title} />
      </div>
      <p className={styles.name}>{song.title}</p>
      <p>{song.artist.name}</p>
    </div>
  );
};

export default Index;
