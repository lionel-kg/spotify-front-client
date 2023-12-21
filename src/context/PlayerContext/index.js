import socketService from '@/services/socketIo.service';
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const AudioPlayerProvider = ({children}) => {
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [indexPlaylist, setIndexPlaylist] = useState(0);
  const [history, setHistory] = useState([]);
  const audioRef = useRef(null);

  const updatePlaylist = newPlaylist => {
    setPlaylist(newPlaylist);
  };

  const handlePlay = (audios, url, thumbnail, title, artist, id) => {
    console.log(audios);
    if (Array.isArray(audios) && audios.length) {
      const playlistUpdated = audios.map(audio => ({
        ...audio,
        thumbnail: thumbnail,
        artist: artist.name,
      }));
      console.log(playlistUpdated);
      setPlaylist(playlistUpdated);
      socketService.emit('startPlayback', {
        currentTime: 0,
        isPlaying: true,
        playlist: playlistUpdated,
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
    }
    setIsPlaying(true);
  };

  useEffect(() => {
    const currentSong = playlist[indexPlaylist];
    if (currentSong && isPlaying) {
      updateHistory(currentSong);
    }
  }, [playlist[indexPlaylist]]);

  const updateHistory = async singleSong => {
    const newHistoryEntry = {
      ...singleSong,
      listens: 1,
      playedAt: new Date().toISOString(),
    };
    setHistory(prevHistory => {
      // Check if the song is already in history
      const existingIndex = prevHistory?.findIndex(
        item => item.id === singleSong.id,
      );
      if (existingIndex !== -1) {
        // Song is already in history, increment the listen count (if you're tracking listens)
        const updatedHistory = [...prevHistory];
        updatedHistory[existingIndex].listens += 1; // Increment listens count
        updatedHistory[existingIndex].playedAt = new Date().toISOString();
        return updatedHistory;
      } else {
        // Song is not in history, add it
        return [...prevHistory, newHistoryEntry];
      }
    });
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
    socketService.emit('startPlayback', {
      currentTime: 0,
      isPlaying: true,
      playlist: [singleSong],
    });
    setIsPlaying(true);
  };

  const handlePlaylist = (audios, thumbnail, artist, index) => {
    console.log(thumbnail);
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
    socketService.emit('startPlayback', {
      currentTime: 0,
      isPlaying: true,
      index: index,
      playlist: playlistUpdated,
    });
    setIsPlaying(true);
  };

  const handlePause = () => {
    // Émettre l'état actuel de la lecture
    socketService.emit('isCurrentlyPlaying', {
      isPlaying: false,
    });
  };

  const handleResume = () => {
    // Émettre l'état actuel de la lecture
    socketService.emit('isCurrentlyPlaying', {
      isPlaying: true,
    });
  };

  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);
  // Vous pouvez éventuellement écouter l'événement isPlaying une seule fois lors de la mise en place du composant
  useEffect(() => {
    const handleIsPlaying = ({isPlaying}) => {
      setIsPlaying(isPlaying);
      if (audioRef.current) {
        isPlaying ? audioRef.current.play() : audioRef.current.pause();
      }
    };
    socketService.on('isPlaying', handleIsPlaying);
    return () => {
      socketService.off('isPlaying', handleIsPlaying);
    };
  }, []);

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
        history,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
