import socketService from '@/services/socketIo.service';
import React, {createContext, useContext, useState} from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const AudioPlayerProvider = ({children}) => {
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [indexPlaylist, setIndexPlaylist] = useState(0);
  const [currentSong, setCurrentSong] = useState();

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

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        updatePlaylist,
        isPlaying,
        setIsPlaying,
        handlePlay,
        currentSong,
        setCurrentSong,
        indexPlaylist,
        setIndexPlaylist,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
