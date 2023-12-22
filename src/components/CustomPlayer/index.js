import React, {useEffect, useRef, useState} from 'react';
import {formatTime} from '@/helpers/tool.helper';
import shuffle from 'just-shuffle';
import styles from './index.module.scss';
import Link from 'next/link';
import {
  FaBackward,
  FaForward,
  FaPauseCircle,
  FaPlayCircle,
} from 'react-icons/fa';
import {
  FaBackwardStep,
  FaBars,
  FaForwardStep,
  FaShuffle,
} from 'react-icons/fa6';
import {IoVolumeMuteOutline, IoVolumeMediumOutline} from 'react-icons/io5';
import {TbRepeat, TbRepeatOnce} from 'react-icons/tb';
import {usePlayer} from '@/context/PlayerContext';
import InputRange from '@/components/InputRange';
import socketService from '@/services/socketIo.service';

const CustomAudioPlayer = ({selectedRoom}) => {
  const {
    playlist,
    updatePlaylist,
    isPlaying,
    handlePause,
    handleResume,
    setIsPlaying,
    indexPlaylist,
    setIndexPlaylist,
    audioRef,
  } = usePlayer();
  const [sharePlaylist, setSharePlaylist] = useState([]);
  const [playlistLength, setPlaylistLength] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // useEffect(() => {

  //   // Écouter l'événement émis par le serveur pour obtenir l'état initial du lecteur audio
  //   socketService.on('playbackState', ({ currentTime, isPlaying, playlist }) => {
  //     if (audioRef.current) {
  //       // Appliquer l'état initial du lecteur audio
  //       setCurrentTime(currentTime);
  //       setDuration(currentTime);
  //       setIsPlaying(isPlaying);
  //       audioRef.current.currentTime = currentTime;
  //       audioRef.current.pause();
  //       // Charger la playlist
  //       // ...

  //       // Si la musique est en cours de lecture, jouer
  //       if (isPlaying) {
  //         audioRef.current.play();
  //       }
  //     }
  //   });

  //   // Nettoyer les écouteurs d'événements lors du démontage du composant
  //   return () => {
  //     socketService.off('playbackState');
  //   };
  // }, []);
  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateTimer = setInterval(() => {
      if (audioRef.current) {
        setDuration(Math.round(audioRef.current.duration));
        setCurrentTime(Math.round(audioRef.current.currentTime));
      }
    }, 1000);

    return () => clearInterval(updateTimer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (playlist.length > 0) {
      socketService.on('playbackStarted', data => {
        setSharePlaylist(data.playlist);
        setIndexPlaylist(data.index ?? 0);
        setPlaylistLength(data.playlist.length);
        if (audioRef.current) {
          // Mettre à jour la playlist directement au démarrage
          updatePlaylist(data.playlist);
          handlePosition(data.currentTime);
          audioRef.current.play();
          setIsPlaying(true);
        }
      });

      return () => {
        socketService.off('playbackStarted');
      };
    }
  }, [playlist]);

  const randomize = array => {
    const randomizedArray = array.slice();
    for (let i = randomizedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomizedArray[i], randomizedArray[j]] = [
        randomizedArray[j],
        randomizedArray[i],
      ];
    }
    setIndexPlaylist(0);
    updatePlaylist(randomizedArray);
    setSharePlaylist(randomizedArray);
    setPlaylistLength(randomizedArray.length);
    setIsShuffleActive(!isShuffleActive);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume);
    }
  };

  const handleSong = () => {
    const newIsPlaying = !isPlaying;

    // Toggle play/pause directly on the audio element
    if (audioRef.current) {
      newIsPlaying ? audioRef.current.play() : audioRef.current.pause();
    }

    // Update the state with the new value
    setIsPlaying(newIsPlaying);

    // Emit the current playing state to the server
    socketService.emit('isCurrentlyPlaying', {
      isPlaying: newIsPlaying,
    });

    // Update the state based on the server response
    socketService.on('isPlaying', ({isPlaying}) => {
      setIsPlaying(isPlaying);
      if (audioRef.current) {
        isPlaying ? audioRef.current.play() : audioRef.current.pause();
      }
    });

    // // Update indexPlaylist based on the playback state
    // if (newIsPlaying && indexPlaylist === playlistLength - 1) {
    //   // If the current song is the last in the playlist and play is pressed, start from the beginning
    //   setIndexPlaylist(0);
    // } else if (!newIsPlaying && indexPlaylist === 0) {
    //   // If the current song is the first in the playlist and pause is pressed, go to the end
    //   setIndexPlaylist(playlistLength - 1);
    // }
  };

  const handlePosition = newCurrentTime => {
    // const rect = e.target.getBoundingClientRect();
    // const x = e.clientX - rect.left; // Position x dans l'élément.
    // const newCurrentTime = (x * duration) / 300;

    // Update the audio element's currentTime
    // if (audioRef.current) {
    //   audioRef.current.currentTime = newCurrentTime;
    // }

    // Emit the current time to the server
    socketService.emit('sendCurrentTime', {
      currentTime: newCurrentTime,
    });

    // Listen for the server's response to synchronize playback
    socketService.on('syncAudio', ({currentTime}) => {
      // Update the audio element's currentTime based on the server response
      if (audioRef.current) {
        setCurrentTime(currentTime);
        audioRef.current.currentTime = currentTime;
      }
    });
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    const handleSongEnd = () => {
      if (repeatMode === 2) {
        audioElement.play();
      } else if (repeatMode === 1 && indexPlaylist === playlistLength - 1) {
        setIndexPlaylist(0);
      } else if (repeatMode === 0 && indexPlaylist === playlistLength - 1) {
        setIsPlaying(false);
      } else if (indexPlaylist < playlistLength - 1) {
        setIndexPlaylist(prevIndex => prevIndex + 1);
      }
    };

    if (audioElement) {
      audioElement.addEventListener('ended', handleSongEnd);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', handleSongEnd);
      }
    };
  }, [repeatMode, indexPlaylist, playlistLength]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.volume = prevVolume;
      }
    }
  }, [playlist]);

  return (
    <>
      {playlist.length > 0 && (
        <div className={styles.container_player}>
          <div className={styles.container_content_song}>
            <div className={styles.container_img}>
              <img
                src={
                  sharePlaylist
                    ? sharePlaylist[indexPlaylist]?.thumbnail
                    : playlist[indexPlaylist]?.thumbnail
                }
                alt="thumbnail"
              />
            </div>
            <div className={styles.info}>
              <p className={styles.song__title}>
                {sharePlaylist.length > 0
                  ? sharePlaylist[indexPlaylist]?.title
                  : playlist[indexPlaylist]?.title}
              </p>
              <p className={styles.song__artist}>
                {playlist[indexPlaylist]?.artist}
              </p>
            </div>
          </div>
          <div className={styles.player}>
            <audio
              onCanPlay={() => {
                if (isPlaying) {
                  audioRef.current.play();
                }
              }}
              ref={audioRef}
              src={
                sharePlaylist.length > 0
                  ? sharePlaylist[indexPlaylist]?.url
                  : playlist[indexPlaylist]?.url
              }
            />
            <div className={styles.options}>
              <button
                className={`${isShuffleActive ? styles.shuffle : ''}`}
                onClick={() => {
                  randomize(playlist);
                  setIsShuffleActive(!isShuffleActive);
                }}
                style={{
                  color: isShuffleActive ? '#1db954' : 'white',
                }}>
                <FaShuffle />
              </button>
              <button
                onClick={() => {
                  if (indexPlaylist > 0) {
                    setIndexPlaylist(indexPlaylist - 1);
                  }
                }}>
                <FaBackwardStep />
              </button>

              <button
                onClick={() => {
                  isPlaying ? handlePause() : handleResume();
                }}>
                {isPlaying ? (
                  <FaPauseCircle size={30} />
                ) : (
                  <FaPlayCircle size={30} />
                )}
              </button>

              <button
                onClick={() => {
                  if (indexPlaylist < playlistLength - 1) {
                    setIndexPlaylist(indexPlaylist + 1);
                  } else {
                    setIndexPlaylist(0);
                  }
                }}>
                <FaForwardStep />
              </button>

              <button
                onClick={() => setRepeatMode(prevMode => (prevMode + 1) % 3)}
                className={`${repeatMode !== 0 ? styles.repeat : ''}`}>
                {repeatMode === 0 && <TbRepeat size={20} />}
                {repeatMode === 1 && <TbRepeat size={20} color="#1db954" />}
                {repeatMode === 2 && <TbRepeatOnce size={20} color="#1db954" />}
              </button>
            </div>
            <div className={styles.bar}>
              <p
                style={{
                  fontSize: 11,
                }}>
                {formatTime(currentTime)}
              </p>
              <InputRange
                value={currentTime}
                onChange={e => {
                  const newCurrentTime = e.target.value;
                  audioRef.current.currentTime = parseFloat(newCurrentTime);
                  handlePosition(newCurrentTime);
                }}
                min={0}
                max={duration}
                step={1}
              />
              <p
                style={{
                  fontSize: 11,
                  padding: '0px 0px 0px 5px',
                }}>
                {formatTime(duration)}
              </p>
            </div>
          </div>
          <Link href="/queue">
            <FaBars />
          </Link>
          <div className={styles.volume_container}>
            <button onClick={handleMute} className={styles.muteButton}>
              {isMuted ? (
                <IoVolumeMuteOutline size={20} />
              ) : (
                <IoVolumeMediumOutline size={20} />
              )}
            </button>
            <InputRange
              value={volume}
              onChange={e => setVolume(e.target.value)}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CustomAudioPlayer;
