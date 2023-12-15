import {formatTime} from '@/helpers/tool.helper';
import shuffle from 'just-shuffle';
import {useEffect, useRef, useState} from 'react';
import styles from './index.module.scss';
import {FaBackward, FaForward, FaPause, FaPlay} from 'react-icons/fa';
import {FaBackwardStep, FaForwardStep, FaShuffle} from 'react-icons/fa6';

const CustomAudioPlayer = () => {
  const audioRef = useRef(null);
  const [indexPlayList, setIndexPlayList] = useState(0);
  const [playList, setPlayList] = useState([
    'http://res.cloudinary.com/dud2dnggu/video/upload/v1702030769/audio/srmnxndhcvhj56asrs7p.mp4',
    'http://res.cloudinary.com/dud2dnggu/video/upload/v1702030831/audio/ve9atbwyqlbzuweba1bt.mp4',
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const updateTimer = setInterval(() => {
      if (!audioRef.current) {
        return;
      }
      setDuration(Math.round(audioRef.current.duration));
      setCurrentTime(Math.round(audioRef.current.currentTime));
    }, 1000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(updateTimer);
  }, []);

  const randomize = array => {
    const randomizedArray = shuffle(array);
    setPlayList(randomizedArray);
    setIndexPlayList(0);
  };

  return (
    <div className={styles.container_player}>
      <div className={styles.container_content_song}>
        <div className={styles.container_img}>
          <img
            src="https://i.scdn.co/image/ab67616d00004851c4e6adea69105e6b6e214b96"
            alt="lil"
          />
        </div>
        <div className={styles.info}>
          <p>500lbs</p>
          <p>Lil tecca</p>
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
          src={playList[indexPlayList]}
        />
        <div className={styles.options}>
          <button onClick={() => randomize(playList)}>
            <FaShuffle />
          </button>
          <button
            onClick={() => {
              if (indexPlayList < 0) {
                setIndexPlayList(indexPlayList - 1);
              } else {
                setIndexPlayList(playList.length - 1);
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
              <FaPause />
            </button>
          ) : (
            <button
              className={styles.play_button}
              onClick={() => {
                audioRef.current.play();
                setIsPlaying(true);
              }}>
              <FaPlay />
            </button>
          )}

          <button
            onClick={() => {
              if (indexPlayList < playList.length - 1) {
                setIndexPlayList(indexPlayList + 1);
              } else {
                setIndexPlayList(0);
              }
            }}>
            <FaForwardStep />
          </button>
        </div>
        <div className={styles.bar}>
          <div>
            <p>{formatTime(currentTime)}</p>
          </div>
          <div
            onClick={e => {
              const rect = e.target.getBoundingClientRect();
              const x = e.clientX - rect.left; // Position x dans l'élément.
              audioRef.current.currentTime = (x * duration) / 300;
              // définir la position de l'audio sur x
            }}
            style={{
              height: 5,
              width: 300,
              background: '#00000042',
              borderRadius: 5,
              margin: '10px 0',
            }}>
            <div
              style={{
                height: 5,
                width: (currentTime * 300) / duration,
                background: 'white',
                borderRadius: 5,
              }}></div>
          </div>
          <div>
            <p>{formatTime(duration)}</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

// Fonction utilitaire pour formater le temps en minutes:secondes

export default CustomAudioPlayer;
