import React, {useEffect} from 'react';
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaRegHeart,
  FaEllipsisH,
} from 'react-icons/fa';
import styles from './index.module.scss'; // Assurez-vous que le chemin vers le fichier SCSS est correct
import AlbumHeader from './AlbumHeader';
import AudioListing from '../AudioListing';
import {usePlaylists} from '@/context/PlaylistContext';
import {usePlayer} from '@/context/PlayerContext';

const AlbumContent = ({album}) => {
  const {albums, addAlbum, removeAlbum, albumExists} = usePlaylists();
  const {
    playlist,
    handlePlaylist,
    handlePause,
    handleResume,
    isPlaying,
    setIsPlaying,
    audioRef,
    indexPlaylist,
    isPlaylistPlaying,
    isSongPlaying,
  } = usePlayer();
  const isAlbumLiked = albumExists(album.id);

  const toggleAlbumLike = () => {
    if (isAlbumLiked) {
      removeAlbum(album.id);
    } else {
      addAlbum(album);
    }
  };

  const isCurrentSongPlaying = isPlaying && isPlaylistPlaying(album.audios);

  const handleClick = e => {
    e.preventDefault();
    if (isPlaylistPlaying(album.audios)) {
      isPlaying ? handlePause(e) : handleResume(e);
    } else {
      album.audios
        ? handlePlaylist(album.audios, album.thumbnail, album.artist)
        : handleSong(url, displayThumbnail, displayTitle, diplayArtist, id);
    }
  };

  return (
    <div className={styles.albumContent}>
      <AlbumHeader album={album} />
      <div className={styles.controlsHeader}>
        <button className={styles.button_play} onClick={handleClick}>
          {isCurrentSongPlaying ? (
            <FaPause className={styles.iconPlay} color="white" />
          ) : (
            <FaPlay color="white" className={styles.iconPlay} />
          )}
        </button>
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
