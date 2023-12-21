import React, {useState, useRef, useEffect} from 'react';
import {FaHeart, FaRegHeart, FaEllipsisV} from 'react-icons/fa';
import styles from './index.module.scss';
import {usePlaylists} from '@/context/PlaylistContext';
import {usePlayer} from '@/context/PlayerContext';
import PlaylistModal from '@/components/PlaylistModal'; // Assurez-vous que ce chemin est correct

const Index = ({audio, index, album}) => {
  const {playlists, addToPlaylist, removeFromPlaylist, addPlaylist} =
    usePlaylists();
  const {
    handlePlaylist,
    handlePause,
    handleResume,
    updatePlaylist,
    indexPlaylist,
    playlist,
    isPlaying,
    setIsPlaying,
    audioRef,
    isSongPlaying,
  } = usePlayer();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    console.log(audio);
    setIsLiked(
      playlists.TitresAimes?.audios?.some(
        likedAudio => likedAudio.id === audio.id,
      ),
    );
  }, [playlists.TitresAimes, audio.title]);

  useEffect(() => {
    console.log(audio);
    const checkIfClickedOutside = e => {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () =>
      document.removeEventListener('mousedown', checkIfClickedOutside);
  }, [showMenu]);

  const formatDuration = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}m ${secs.toString().padStart(2, '0')}`;
  };

  const handlePlay = e => {
    if (isSongPlaying(audio.id)) {
      if (isPlaying) {
        handlePause(e);
      } else {
        handleResume(e);
      }
    } else {
      handlePlaylist(album?.audios, album?.thumbnail, album?.artist, index);
    }
  };

  const handleLike = e => {
    e.stopPropagation();
    if (isLiked) {
      removeFromPlaylist('TitresAimes', audio.id);
    } else {
      console.log(album?.artist);
      audio.thumbnail = album.thumbnail;

      addToPlaylist('TitresAimes', audio);
    }
    setIsLiked(!isLiked);
  };

  const handleMenuClick = e => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleAddToPlaylist = playlistName => {
    if (
      !playlists[playlistName]?.audios?.some(
        playlistAudio => playlistAudio.title === audio.title,
      )
    ) {
      audio.thumbnail = album.thumbnail;
      addToPlaylist(playlistName, audio);
    }
    setShowMenu(false);
  };

  const handleNewPlaylistModal = () => {
    setShowMenu(false);
    setShowModal(true);
  };

  const handleCreateNewPlaylist = playlistName => {
    audio.thumbnail = album.thumbnail;
    addPlaylist(playlistName, [audio]);
    setShowModal(false);
  };

  return (
    <div
      className={styles.audioRow}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handlePlay}>
      <span className={styles.audioCell}>{index + 1}</span>
      <span
        className={`${styles.audioCell} ${
          isSongPlaying(audio.id) && styles.playing
        }`}>
        {audio.title}
      </span>
      <span className={styles.audioCell}>{formatDuration(audio.duration)}</span>
      <span className={styles.audioCell}>
        {isHovering && (
          <>
            {isLiked ? (
              <FaHeart
                className={`${styles.likeIcon} ${styles.liked}`}
                onClick={handleLike}
              />
            ) : (
              <FaRegHeart
                className={styles.likeIcon}
                onClick={e => handleLike(e)}
              />
            )}
            <FaEllipsisV
              className={styles.menuIcon}
              onClick={e => handleMenuClick(e)}
            />
          </>
        )}
        {showMenu && (
          <div
            className={styles.menu}
            ref={menuRef}
            onClick={e => e.stopPropagation()}>
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
