// layouts/MainLayout.js
import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import Navbar from '@/components/NavBar';
import Library from '@/components/Library';
import {usePlayer} from '@/context/PlayerContext';
import socketService from '@/services/socketIo.service';

const Index = ({children}) => {
  const [displayListing, setDisplayListing] = useState(false);

  const {playlist, updatePlaylist} = usePlayer();
  useEffect(() => {
    // Initialiser la connexion au socket ici
    socketService.connect();
    updatePlaylist(['']);
    // Nettoyer la connexion au socket lors du démontage du composant
    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <div
      className={`${styles.main__layout} ${
        displayListing === 'expanded'
          ? styles.expanded
          : displayListing === 'contracted'
          ? styles.contracted
          : ''
      }`}>
      <div className={styles.left__layout}>
        <Navbar displayListing={displayListing} />
        <Library
          displayListing={displayListing}
          setDisplayListing={setDisplayListing}
        />
      </div>
      <div className={styles.right__layout}>{children}</div>
    </div>
  );
};

export default Index;
