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
  const handleClickExpanded = e => {
    e.stopPropagation();
    props.setDisplayListing(
      props.displayListing !== 'expanded' ? 'expanded' : '',
    );
  };
  const handleClickContracted = e => {
    e.stopPropagation();
    props.setDisplayListing(
      props.displayListing !== 'contracted' ? 'contracted' : '',
    );
  };

  const handleCreateNewPlaylist = playlistName => {
    addPlaylist(playlistName);
    setShowModal(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.titleLine}>
        <div
          onClick={e => {
            handleClickContracted(e);
          }}
          className={styles.icon__library}>
          {props.displayListing !== 'contracted' ? (
            <TitleIcon
              type="h2"
              title="Bibliothèque"
              icon={<LuLibrary />}
              className={styles.title}
            />
          ) : (
            <LuLibrary />
          )}
        </div>
        {props.displayListing !== 'contracted' && (
          <div className={styles.buttons}>
            <Button
              onClick={() => {
                setShowModal(true);
              }}>
              <FaPlus />
            </Button>

            <Button
              onClick={e => {
                handleClickExpanded(e);
              }}>
              {props.displayListing === 'expanded' ? (
                <FaArrowLeft />
              ) : (
                <FaArrowRight />
              )}
            </Button>
          </div>
        )}
      </div>
      {props.displayListing !== 'contracted' && (
        <>
          <div className={styles.categories}>
            <Categories {...props} />
          </div>
          <PlaylistModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onCreate={handleCreateNewPlaylist}
          />
        </>
      )}
    </div>
  );
};

export default Index;
