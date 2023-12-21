import React, {useEffect, useState, useCallback} from 'react';
import PageTitle from '../components/PageTitle';
import Section from '../components/Section/index';
import audioService from '@/services/audio.service';
import Card from '@/components/Card';
import socketService, {getRooms} from '@/services/socketIo.service';
import axios from '../config/axios';
import {usePlayer} from '@/context/PlayerContext';

export default function Home() {
  const [audios, setAudios] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [socket, setSocket] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const {playlist, updatePlaylist} = usePlayer();

  const handleJoinRoom = useCallback(() => {
    socketService.on('playbackState', ({currentTime, isPlaying, playlist}) => {
      console.log('playbackState', currentTime, isPlaying, playlist);
      updatePlaylist(playlist);
    });
  }, []);

  useEffect(() => {
    socketService.connect();
    socketService.emit('getRooms'); // Écouter la liste des salles mise à jour du serveur
    socketService.on('roomsList', updatedRoomsList => {
      setRooms(updatedRoomsList);
    });
    return () => {
      socketService.off('getRooms', handleUserJoined);
      socketService.off('roomsList', handleUserLeft);
    };
  }, []);

  useEffect(() => {
    audioService.getAudios().then(res => {
      setAudios(res);
      setLoading(false);
      console.log(audios);
    });
  }, []);

  return (
    <div className="">
      {loading === false && (
        <>
          <Section title="Ecouté recemment" cards={audios} />
          <button onClick={handleJoinRoom}>rejoindre l'ecoute</button>
        </>
      )}
    </div>
  );
}
