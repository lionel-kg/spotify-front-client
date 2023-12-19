import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import {useRouter} from 'next/router';
import {FaPlay} from 'react-icons/fa';
import {usePlayer} from '@/context/PlayerContext';
import socketService from '@/services/socketIo.service';

const Index = ({title, name, thumbnail, artist, album, audios, url, id}) => {
  const {handlePlay, playlist} = usePlayer();
  const displayTitle = title || name;
  const displayThumbnail = album?.thumbnail || thumbnail;
  const diplayArtist = artist || '';
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const onPlay = e => {
    e.stopPropagation();
    handlePlay(audios, url, displayThumbnail, displayTitle, diplayArtist, id);
  };

  useEffect(() => {
    socketService.connect();
  }, []);

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

  const handleCard = e => {
    e.preventDefault();
    // Implémentez la navigation ou toute autre logique ici
    // router.push(props.href); // Ajustez avec votre logique de navigation réelle
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
