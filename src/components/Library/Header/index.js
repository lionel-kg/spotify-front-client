import React from 'react';
import styles from './index.module.scss';
import Button from '@/components/Button';
import TitleIcon from '@/components/Title/TitleIcon';
import Categories from '../Categories';

//Icons
import {useState} from 'react';
import {LuLibrary} from 'react-icons/lu';
import {FaPlus, FaArrowRight, FaArrowLeft} from 'react-icons/fa6';
import {usePlaylists} from '@/context/PlaylistContext';
import PlaylistModal from '@/components/PlaylistModal'; // Assurez-vous que ce chemin est correct

const Index = props => {
  const [showModal, setShowModal] = useState(false);
  const {playlists, addPlaylist} = usePlaylists();
  const handleClick = e => {
    e.preventDefault();
    props.setDisplayListing(!props.displayListing);
  };

  const handleCreateNewPlaylist = playlistName => {
    addPlaylist(playlistName);
    setShowModal(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.titleLine}>
        <TitleIcon
          type="h2"
          title="Bibliothèque"
          icon={<LuLibrary />}
          className={styles.title}
        />

        <div className={styles.buttons}>
          <Button
            onClick={() => {
              setShowModal(true);
            }}>
            <FaPlus />
          </Button>

          <Button
            onClick={e => {
              handleClick(e);
            }}>
            {props.displayListing ? <FaArrowLeft /> : <FaArrowRight />}
          </Button>
        </div>
      </div>
      <div className={styles.categories}>
        <Categories {...props} />
      </div>

      <PlaylistModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateNewPlaylist}
      />
    </div>
  );
};

export default Index;
