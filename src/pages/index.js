import React, {useEffect, useState, useCallback, useMemo} from 'react';
import PageTitle from '../components/PageTitle';
import Section from '../components/Section/index';
import audioService from '@/services/audio.service';
import albumService from '@/services/album.service';
import Card from '@/components/Card';
import socketService, {getRooms} from '@/services/socketIo.service';
import axios from '../config/axios';
import {usePlayer} from '@/context/PlayerContext';

export default function Home() {
  const [audios, setAudios] = useState({});
  const [albums, setAlbums] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [socket, setSocket] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const {history} = usePlayer();

  // const handleJoinRoom = useCallback(() => {
  //   socketService.on('playbackState', ({currentTime, isPlaying, playlist}) => {
  //     console.log('playbackState', currentTime, isPlaying, playlist);
  //     updatePlaylist(playlist);
  //   });
  // }, []);

  // useEffect(() => {
  //   socketService.connect();
  //   socketService.emit('getRooms'); // Écouter la liste des salles mise à jour du serveur
  //   socketService.on('roomsList', updatedRoomsList => {
  //     setRooms(updatedRoomsList);
  //   });
  //   return () => {
  //     socketService.off('getRooms', handleUserJoined);
  //     socketService.off('roomsList', handleUserLeft);
  //   };
  // }, []);

  useEffect(() => {
    setLoading(true);

    Promise.all([audioService.getAudios(), albumService.getAlbums()])
      .then(([audiosResult, albumsResult]) => {
        setAudios(audiosResult);
        setAlbums(albumsResult);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        // Stop loading after fetching data
        setLoading(false);
      });
  }, []);

  const bestHistory = useMemo(
    () =>
      history
        .slice()
        .sort((a, b) => b.listens - a.listens)
        .slice(0, 20),
    [history],
  );

  const lastHistory = useMemo(
    () =>
      history
        .slice()
        .sort((a, b) => b.playedAt - a.playedAt)
        .slice(0, 20),
    [history],
  );

  return (
    <div className="">
      {loading === false && (
        <>
          {lastHistory.length > 0 && (
            <Section
              title="Ecouté recemment"
              cards={lastHistory}
              isAlbum={false}
            />
          )}
          <Section title="Albums" cards={albums} />
          <Section title="Musiques" cards={audios} />
          {/* <button onClick={handleJoinRoom}>rejoindre l'ecoute</button> */}
        </>
      )}
    </div>
  );
}
