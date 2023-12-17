import { formatTime } from '@/helpers/tool.helper';
import shuffle from 'just-shuffle';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { FaBackward, FaForward, FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { FaBackwardStep, FaForwardStep, FaShuffle } from 'react-icons/fa6';
import { IoVolumeMuteOutline, IoVolumeMediumOutline } from "react-icons/io5";
import { TbRepeat, TbRepeatOnce } from "react-icons/tb";
import { usePlayer } from '@/context/PlayerContext';
import InputRange from '@/components/InputRange';

const CustomAudioPlayer = () => {
  const audioRef = useRef(null);
  const { playlist, updatePlaylist, isPlaying, setIsPlaying, indexPlaylist, setIndexPlaylist } = usePlayer();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);

  useEffect(() => {
    const updateTimer = setInterval(() => {
      if (!audioRef.current) {
        return;
      }
      setDuration(Math.round(audioRef.current.duration));
      setCurrentTime(Math.round(audioRef.current.currentTime));
    }, 1000);

    console.log("playser", playlist);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(updateTimer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Add this useEffect
    }
  }, [volume]);


  const randomize = array => {
    const randomizedArray = shuffle(array);
    setIndexPlaylist(0);
    updatePlaylist(randomizedArray);
    setIsShuffleActive(!isShuffleActive);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      // If we are about to mute, save the current volume and set volume to 0
      setPrevVolume(volume);
      setVolume(0);
    } else {
      // If we are unmuting, restore the previous volume
      setVolume(prevVolume);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    console.log(indexPlaylist);
    const handleSongEnd = () => {
      if (repeatMode === 2) {
        audioElement.play();
      } else if (repeatMode === 1 && indexPlaylist === playlist.length - 1) {
        setIndexPlaylist(0);
      } else if (repeatMode === 0 && indexPlaylist === playlist.length - 1) {
        setIsPlaying(false);
      } else if (indexPlaylist < playlist.length - 1) {
        setIndexPlaylist((prevIndex) => prevIndex + 1);
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
  }, [repeatMode, indexPlaylist, playlist.length]);


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.volume = prevVolume;
      }
    }
  }, [isMuted, prevVolume]);

  return (
    <>
      {playlist.length > 0 && (
        <div className={styles.container_player}>
          <div className={styles.container_content_song}>
            <div className={styles.container_img}>
              <img
                src={playlist[indexPlaylist]?.thumbnail}
                alt="thumbnail"
              />
            </div>
            <div className={styles.info}>
              <p className={styles.song__title}>{playlist[indexPlaylist]?.title}</p>
              <p className={styles.song__artist}>{playlist[indexPlaylist]?.artist}</p>
            </div>
          </div>
          <div className={styles.player}>
            <audio
              onChange={e => {
                console.log('e', e);
              }}
              onCanPlay={() => {
                if (isPlaying) {
                  audioRef.current.play();
                }
              }}
              ref={audioRef}
              src={playlist[indexPlaylist]?.url}
            />
            <div className={styles.options}>
              <button onClick={() => randomize(playlist)}
                style={{
                  color: isShuffleActive ? '#1db954' : 'white',
                }}
              >
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
              {isPlaying ? (
                <button
                  onClick={() => {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }}>
                  <FaPauseCircle size={30} />
                </button>
              ) : (
                <button
                  className={styles.play_button}
                  onClick={() => {
                    audioRef.current.play();
                    setIsPlaying(true);
                  }}>
                  <FaPlayCircle size={30} />
                </button>
              )}

              <button
                onClick={() => {
                  if (indexPlaylist < playlist.length - 1) {
                    setIndexPlaylist(indexPlaylist + 1);
                  } else {
                    setIndexPlaylist(0);
                  }
                }}>
                <FaForwardStep />
              </button>

              <button
                onClick={() => setRepeatMode((prevMode) => (prevMode + 1) % 3)}
                className={`${repeatMode !== 0 ? styles.repeat : ''}`}
              >
                {repeatMode === 0 && <TbRepeat size={20} />}
                {repeatMode === 1 && <TbRepeat size={20} color='#1db954' />}
                {repeatMode === 2 && <TbRepeatOnce size={20} color='#1db954' />}
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
          <div className={styles.volume_container}>
            <button
              onClick={handleMute}
              className={styles.muteButton}
            >
              {isMuted ? <IoVolumeMuteOutline size={20} /> : <IoVolumeMediumOutline size={20} />}
            </button>
            <InputRange
              value={volume}
              onChange={e => setVolume(e.target.value)}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div >
      )}
    </>
  );
};

export default CustomAudioPlayer;
