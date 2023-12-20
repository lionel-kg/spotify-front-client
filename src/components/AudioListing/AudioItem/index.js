import React, {useState, useRef, useEffect} from 'react';
import {FaHeart, FaRegHeart, FaEllipsisV} from 'react-icons/fa';
import styles from './index.module.scss';
import {usePlaylists} from '@/context/PlaylistContext';
import PlaylistModal from '@/components/PlaylistModal'; // Assurez-vous que ce chemin est correct

const Index = ({audio, index}) => {
  const {playlists, addToPlaylist, removeFromPlaylist, addPlaylist} =
    usePlaylists();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    setIsLiked(
      playlists.TitresAimes?.audios?.some(
        likedTrack => likedTrack.title === audio.title,
      ),
    );
  }, [playlists.TitresAimes, audio.title]);

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () =>
      document.removeEventListener('mousedown', checkIfClickedOutside);
  }, [showMenu]);

  const handleLike = () => {
    if (isLiked) {
      removeFromPlaylist('TitresAimes', audio.title);
    } else {
      addToPlaylist('TitresAimes', audio);
    }
    setIsLiked(!isLiked);
  };

  const handleMenuClick = () => setShowMenu(!showMenu);

  const handleAddToPlaylist = playlistName => {
    if (
      !playlists[playlistName]?.audios?.some(
        playlistAudio => playlistAudio.title === audio.title,
      )
    ) {
      addToPlaylist(playlistName, audio);
    }
    setShowMenu(false);
  };

  const handleNewPlaylistModal = () => {
    setShowMenu(false);
    setShowModal(true);
  };

  const handleCreateNewPlaylist = playlistName => {
    addPlaylist(playlistName, [audio]);
    setShowModal(false);
  };

  return (
    <div
      className={styles.audioRow}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}>
      <span className={styles.audioCell}>{index + 1}</span>
      <span className={styles.audioCell}>{audio.title}</span>
      <span className={styles.audioCell}>{audio.duration}</span>
      <span className={styles.audioCell}>
        {isHovering && (
          <>
            {isLiked ? (
              <FaHeart
                className={`${styles.likeIcon} ${styles.liked}`}
                onClick={handleLike}
              />
            ) : (
              <FaRegHeart className={styles.likeIcon} onClick={handleLike} />
            )}
            <FaEllipsisV
              className={styles.menuIcon}
              onClick={handleMenuClick}
            />
          </>
        )}
        {showMenu && (
          <div className={styles.menu} ref={menuRef}>
            {Object.keys(playlists).map(playlistName => (
              <div
                key={playlistName}
                onClick={() => handleAddToPlaylist(playlistName)}>
                Ajouter à {playlistName}
              </div>
            ))}
            <div onClick={handleNewPlaylistModal}>
              Créer une nouvelle playlist
            </div>
          </div>
        )}
      </span>
      <PlaylistModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateNewPlaylist}
      />
    </div>
  );
};

export default Index;
