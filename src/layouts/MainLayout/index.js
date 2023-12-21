// layouts/MainLayout.js
import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import Navbar from '@/components/NavBar';
import Library from '@/components/Library';
import {usePlayer} from '@/context/PlayerContext';
import socketService from '@/services/socketIo.service';

const Index = ({children}) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
      className={`${styles.main__layout} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.left__layout}>
        <Navbar />
        <Library setIsExpanded={setIsExpanded} />
      </div>
      <div className={styles.right__layout}>{children}</div>
    </div>
  );
};

export default Index;
