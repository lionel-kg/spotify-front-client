import socketService from '@/services/socketIo.service';
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  openDatabase,
  addToHistory,
  readHistory,
} from '../../utils/indexedDBUtils';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const AudioPlayerProvider = ({children}) => {
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [indexPlaylist, setIndexPlaylist] = useState(0);
  const [history, setHistory] = useState([]);
  const audioRef = useRef(null);

  const updatePlaylist = newPlaylist => {
    console.log(newPlaylist);
    setPlaylist(newPlaylist);
  };

  const handlePlay = (audios, url, thumbnail, title, artist, id) => {
    if (Array.isArray(audios) && audios.length) {
      const playlistUpdated = audios.map(audio => ({
        ...audio,
        thumbnail: thumbnail,
        artist: artist.name,
      }));
      setPlaylist(playlistUpdated);
      socketService.emit('startPlayback', {
        currentTime: 0,
        isPlaying: true,
        playlist: [playlistUpdated],
      });
    } else if (url) {
      const singleSong = {
        id: id,
        title: title,
        artist: artist.name,
        url: url,
        thumbnail: thumbnail,
      };
      setPlaylist([singleSong]);
      socketService.emit('startPlayback', {
        currentTime: 0,
        isPlaying: true,
        playlist: [singleSong],
      });
      console.log(singleSong);
    }
    setIsPlaying(true);
  };

  // useEffect(() => {
  //   setHistory(readHistory());
  // }, [history])

  const addPlaylistToHistory = async audios => {
    audios.map(async audio => {
      const isAlreadyInHistory = history.some(h => h.id === audio.id);
      if (!isAlreadyInHistory) {
        // Add the additional properties to each audio, if necessary
        const audioToAdd = {
          ...audio,
          playedAt: Date.now(),
        };
        await addToHistory(audioToAdd);
      }
    });

    const savedHistory = await readHistory();
  };

  const handleSong = async (url, thumbnail, title, artist, id) => {
    setPlaylist[[]];
    setIndexPlaylist(0);
    const singleSong = {
      id: id,
      title: title,
      artist: artist?.name,
      url: url,
      thumbnail: thumbnail,
      playedAt: Date.now(),
    };
    setPlaylist([singleSong]);
    setIsPlaying(true);
    await addToHistory(singleSong);
    const savedHistory = await readHistory();
  };

  const handlePlaylist = (audios, thumbnail, artist, index) => {
    setPlaylist[[]];
    index ? setIndexPlaylist(index) : setIndexPlaylist(0);
    const playlistUpdated = audios.map(audio => ({
      ...audio,
      thumbnail:
        thumbnail ||
        'https://www.laboiteverte.fr/wp-content/uploads/2012/01/musique-lego-01.jpg',
      artist: artist?.name,
      playedAt: Date.now(),
    }));
    setPlaylist(playlistUpdated);
    addPlaylistToHistory(audios);
    setIsPlaying(true);
  };

  const handlePause = e => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleResume = e => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const isPlaylistPlaying = audios => {
    return audios?.some(audio => audio.id === playlist[indexPlaylist]?.id);
  };

  const isSongPlaying = id => {
    return playlist[indexPlaylist]?.id === id;
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        playlist,
        updatePlaylist,
        isPlaying,
        setIsPlaying,
        handleSong,
        handlePlaylist,
        handlePause,
        handleResume,
        indexPlaylist,
        setIndexPlaylist,
        isPlaylistPlaying,
        isSongPlaying,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
