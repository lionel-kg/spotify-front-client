import React, {useEffect} from 'react';
import {FaPlay, FaHeart, FaRegHeart, FaEllipsisH} from 'react-icons/fa';
import styles from './index.module.scss'; // Assurez-vous que le chemin vers le fichier SCSS est correct
import AlbumHeader from './AlbumHeader';
import AudioListing from '../AudioListing';
import {usePlaylists} from '@/context/PlaylistContext';

const AlbumContent = ({album}) => {
  // const album = {
  //   title: 'Evolve',
  //   artist: 'Imagine Dragons',
  //   year: '2017',
  //   totalDuration: '43 min 7 s',
  //   imageUrl: '/path/to/album-image.jpg',
  //   tracks: [
  //     {title: 'Next To Me', duration: '3:50'},
  //     {title: "I Don't Know Why", duration: '3:10'},
  //   ],
  // };
  console.log('album', album);

  const {albums, addAlbum, removeAlbum, albumExists} = usePlaylists();
  const isAlbumLiked = albumExists(album.id);

  const toggleAlbumLike = () => {
    if (isAlbumLiked) {
      removeAlbum(album.id);
    } else {
      addAlbum(album);
    }
  };

  return (
    <div className={styles.albumContent}>
      <AlbumHeader album={album} />
      <div className={styles.controlsHeader}>
        <FaPlay className={styles.iconPlay} />
        {isAlbumLiked ? (
          <FaHeart
            className={`${styles.iconHeart} ${styles.liked}`}
            onClick={toggleAlbumLike}
          />
        ) : (
          <FaRegHeart className={styles.iconHeart} onClick={toggleAlbumLike} />
        )}

        <FaEllipsisH className={styles.iconMore} />
      </div>
      <AudioListing album={album} />
    </div>
  );
};

export default AlbumContent;
