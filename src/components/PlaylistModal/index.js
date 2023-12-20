import React, {useState} from 'react';
import styles from './index.module.scss';
import Input from '../Input';
import Button from '../Button';
import Title from '../Title';

const PlaylistModal = ({isOpen, onClose, onCreate}) => {
  const [playlistName, setPlaylistName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onCreate(playlistName);
    setPlaylistName('');
    onClose();
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      setPlaylistName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <Title type="h2">Créer une nouvelle playlist</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={playlistName}
            onChange={e => setPlaylistName(e.target.value)}
            placeholder="Nom de la playlist"
            required
          />
          <Button type="submit">Créer</Button>
          <Button onClick={onClose}>Annuler</Button>
        </form>
      </div>
    </div>
  );
};

export default PlaylistModal;
