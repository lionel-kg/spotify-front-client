import React, {createContext, useContext, useState} from 'react';

const PlaylistContext = createContext();

export const usePlaylists = () => useContext(PlaylistContext);

export const PlaylistProvider = ({children}) => {
  const updateDate = () => new Date().toISOString();

  const [playlists, setPlaylists] = useState({
    TitresAimes: {type: 'playlist', audios: [], updated_at: updateDate()},
  });

  const [albums, setAlbums] = useState({});

  const addPlaylist = (name, audios = [], album) => {
    setPlaylists(prevPlaylists => ({
      ...prevPlaylists,
      [name]: {audios, album, updated_at: updateDate()},
    }));
  };

  const addAlbum = album => {
    setAlbums(prevAlbums => ({
      ...prevAlbums,
      [album.id]: {album, updated_at: updateDate()},
    }));
  };

  const removePlaylist = name => {
    setPlaylists(prevPlaylists => {
      const updatedPlaylists = {...prevPlaylists};
      delete updatedPlaylists[name];
      return updatedPlaylists;
    });
  };

  const removeAlbum = id => {
    setAlbums(prevAlbums => {
      const updatedPlaylists = {...prevAlbums};
      delete updatedPlaylists[id];
      return updatedPlaylists;
    });
  };

  const playlistExists = name => {
    return Object.hasOwnProperty.call(playlists, name);
  };

  const albumExists = id => {
    return Object.hasOwnProperty.call(albums, id);
  };

  const addToPlaylist = (playlistName, audio) => {
    setPlaylists(prevPlaylists => {
      // Vérifier si la playlist existe déjà
      const existingPlaylist = prevPlaylists[playlistName];

      if (existingPlaylist) {
        if (
          existingPlaylist.audios !== undefined &&
          existingPlaylist.audios.length > 0 &&
          existingPlaylist.audios.some(
            existingTrack => existingTrack.title === audio.title,
          )
        ) {
          return prevPlaylists;
        }

        return {
          ...prevPlaylists,
          [playlistName]: {
            ...existingPlaylist,
            audios: [...existingPlaylist?.audios, audio],
            updated_at: updateDate(),
          },
        };
      }

      // Si la playlist n'existe pas, la créer avec la nouvelle piste
      return {
        ...prevPlaylists,
        [playlistName]: {
          audios: [audio],
          updated_at: updateDate(),
        },
      };
    });
  };

  const removeFromPlaylist = (playlistName, audioTitle) => {
    setPlaylists({
      ...playlists,
      [playlistName]: {
        ...playlists[playlistName],
        audios: playlists[playlistName]?.audios?.filter(
          audio => audio.title !== audioTitle,
        ),
        updated_at: updateDate(),
      },
    });
  };

  // Ajoutez d'autres méthodes de gestion de playlists ici si nécessaire

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        addToPlaylist,
        removeFromPlaylist,
        addPlaylist,
        removePlaylist,
        playlistExists,
        albums,
        addAlbum,
        removeAlbum,
        albumExists,
      }}>
      {children}
    </PlaylistContext.Provider>
  );
};
