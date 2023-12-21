import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import {useRouter} from 'next/router';
import {FaPlay, FaPause} from 'react-icons/fa';
import {usePlayer} from '@/context/PlayerContext';
import Link from 'next/link';
import socketService from '@/services/socketIo.service';

const Index = ({title, name, thumbnail, artist, album, audios, url, id}) => {
  const {
    playlist,
    handlePlaylist,
    handleSong,
    handlePause,
    handleResume,
    isPlaying,
    setIsPlaying,
    audioRef,
    indexPlaylist,
    isPlaylistPlaying,
    isSongPlaying,
  } = usePlayer();
  const displayTitle = title || name;
  const displayThumbnail = album?.thumbnail || thumbnail;
  const diplayArtist = artist || '';
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenAlbum = album => {
    const albumId = album?.id ?? id;
    console.log(albumId);
    return `/albums/${albumId}`;
  };

  // useEffect(() => {
  //   socketService.connect();
  // }, []);

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    if (isSongPlaying(id) || isPlaylistPlaying(audios)) {
      isPlaying ? handlePause(e) : handleResume(e);
    } else {
      audios
        ? handlePlaylist(audios, displayThumbnail, diplayArtist)
        : handleSong(url, displayThumbnail, displayTitle, diplayArtist, id);
    }
  };

  const isCurrentSongPlaying =
    isPlaying && (isSongPlaying(id) || isPlaylistPlaying(audios));

  return (
    <Link className={styles.listItem} href={handleOpenAlbum(album)}>
      <div
        className={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className={styles.container_img}>
          <img
            src={
              displayThumbnail ??
              'https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png'
            }
            alt={displayTitle}
          />
          {(isCurrentSongPlaying || isHovered) && (
            <button className={styles.button_play} onClick={handleClick}>
              {isCurrentSongPlaying ? (
                <FaPause color="white" />
              ) : (
                <FaPlay color="white" />
              )}
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
