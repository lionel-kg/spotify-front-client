import React, {useEffect, useState} from 'react';
import {FaPlay, FaEllipsisH, FaTrash} from 'react-icons/fa';
import styles from './index.module.scss';
import PlaylistHeader from './PlaylistHeader';
import AudioListing from '../AudioListing';
import Button from '../Button';
import {usePlaylists} from '@/context/PlaylistContext';

const PlaylistContent = ({playlist}) => {
  const {removePlaylist} = usePlaylists();

  const [displayTrash, setDisplayTrash] = useState(
    playlist?.name !== 'TitresAimes',
  );

  const handleremovePlaylist = () => {
    removePlaylist(playlist.id);
  };

  return (
    <div className={styles.albumContent}>
      <PlaylistHeader playlist={playlist} />
      <div className={styles.controlsHeader}>
        <FaPlay className={styles.iconPlay} />

        {displayTrash ?? (
          <Button onClick={handleremovePlaylist}>
            <FaTrash />
          </Button>
        )}
      </div>
      <AudioListing album={playlist} />
    </div>
  );
};

export default PlaylistContent;
