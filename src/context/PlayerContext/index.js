import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const AudioPlayerProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);

  const updatePlaylist = (newPlaylist) => {
    setPlaylist(newPlaylist);
  };

  return (
    <PlayerContext.Provider value={{ playlist, updatePlaylist }}>
      {children}
    </PlayerContext.Provider>
  );
};
