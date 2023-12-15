import { formatTime } from '@/helpers/tool.helper';
import shuffle from 'just-shuffle';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { FaBackward, FaForward, FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { FaBackwardStep, FaForwardStep, FaShuffle } from 'react-icons/fa6';
import { IoVolumeMuteOutline, IoVolumeMediumOutline } from "react-icons/io5";
import { usePlayer } from '@/context/PlayerContext';
import InputRange from '@/components/InputRange';

const CustomAudioPlayer = () => {
  const audioRef = useRef(null);
  const [indexPlaylist, setIndexPlaylist] = useState(0);
  const { playlist, updatePlaylist } = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }


  const getSliderBackground = () => {
    const percentage = (volume * 100).toFixed(0);
    const colorFilled = isHovering ? '#1db954' : '#ffffff';
    const colorUnfilled = '#00000042';
    return `linear-gradient(to right, ${colorFilled} 0%, ${colorFilled} ${percentage}%, ${colorUnfilled} ${percentage}%, ${colorUnfilled} 100%)`;
  };

  const sliderStyles = {
    background: getSliderBackground(),
    width: '100%',
    height: '5px',
    borderRadius: '4px',
    outline: 'none'
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

  // This useEffect will update the 'muted' property of the audio element
  // whenever 'isMuted' state changes.
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
                src="https://i.scdn.co/image/ab67616d00004851c4e6adea"
                alt="lil"
              />
            </div>
            <div className={styles.info}>
              <p className={styles.song__title}>{playlist[indexPlaylist].title}</p>
              <p className={styles.song__artist}></p>
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
              src={playlist[indexPlaylist].url}
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
                  if (indexPlaylist < 0) {
                    setIndexPlaylist(indexPlaylist - 1);
                  } else {
                    setIndexPlaylist(playlist.length - 1);
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
            </div>
            <div className={styles.bar}>
              <div>
                <p
                  style={{
                    fontSize: 11,
                  }}>
                  {formatTime(currentTime)}
                </p>
              </div>
              <div
                onClick={e => {
                  const rect = e.target.getBoundingClientRect();
                  const x = e.clientX - rect.left; // Position x dans l'élément.
                  audioRef.current.currentTime = (x * duration) / 300;
                  // définir la position de l'audio sur x
                }}
                style={{
                  height: "3",
                  width: 300,
                  background: 'grey',
                  borderRadius: 5,
                  margin: '10px 0',
                }}>
                <div
                  style={{
                    height: 3,
                    width: (currentTime * 300) / duration,
                    background: 'white',
                    borderRadius: 5,
                    background: isHovered ? '#1db954' : 'white',
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                </div>
              </div>
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
            <div
              className={styles.volume_slider}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}>
              <InputRange
                value={volume}
                onChange={e => setVolume(e.target.value)}
                sliderBackground={getSliderBackground(volume, 1, '#1db954')}
                min={0}
                max={1}
                step={0.01}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default CustomAudioPlayer;
