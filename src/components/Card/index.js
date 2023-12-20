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

  /* const handlePlay = e => {
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
  };*/

  const handleOpenAlbum = id => {
    return `/albums/${id}`;
  };

  const onPlay = e => {
    e.stopPropagation();
    handlePlay(audios, url, displayThumbnail, displayTitle, diplayArtist, id);
  };

  // useEffect(() => {
  //   socketService.connect();
  // }, []);

  const handleClick = e => {
    e.preventDefault();
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

  // const handlePlay = e => {
  //   e.stopPropagation();
  //   if (Array.isArray(audios) && audios.length) {
  //     updatePlaylist(audios);
  //   } else if (url) {
  //     const singleSong = {
  //       title: title || 'Unknown Title', // Ajustez avec les noms de propriétés réels
  //       artist: subtitle || 'Unknown Artist',
  //       url: url,
  //       thumbnail: thumbnail,
  //     };
  //     updatePlaylist([singleSong]);
  //     // Émettez l'événement pour démarrer la lecture dans la salle sélectionnée
  //     socketService.emit('startPlayback', {
  //       currentTime: 0,
  //       isPlaying: true,
  //       playlist: [singleSong],
  //     });
  //   }

  return (
    <Link className={styles.listItem} href={handleOpenAlbum(id)}>
      <div
        className={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className={styles.container_img}>
          <img src={displayThumbnail} alt={displayTitle} />
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
