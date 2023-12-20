import React, {useState} from 'react';
import styles from './index.module.scss';
import {useRouter} from 'next/router';
import {FaPlay} from 'react-icons/fa';
import {usePlayer} from '@/context/PlayerContext';
import Link from 'next/link';

const Index = ({
  id,
  title,
  name,
  thumbnail,
  subtitle,
  artist,
  album,
  audios,
  url,
}) => {
  const {updatePlaylist, playlist} = usePlayer();
  const displayTitle = title || name;
  const displayThumbnail = album?.thumbnail || thumbnail;
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  // console.log('propsssssss', props);
  console.log('propsssssss', thumbnail);

  const handlePlay = e => {
    e.stopPropagation();
    if (Array.isArray(audios) && audios.length) {
      updatePlaylist(audios);
    } else if (url) {
      const singleSong = {
        title: title || 'Unknown Title',
        artist: subtitle || 'Unknown Artist',
        url: url,
        thumbnail: props.thumbnail,
      };
      updatePlaylist([singleSong]);
    }
  };

  const handleOpenAlbum = id => {
    return `/albums/${id}`;
  };

  return (
    <Link className={styles.listItem} href={handleOpenAlbum(id)}>
      <div
        className={styles.card}
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
    </Link>
  );
};

export default Index;
