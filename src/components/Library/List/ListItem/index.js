import React from 'react';
import {FaHeart, FaMusic, FaUser} from 'react-icons/fa';
import styles from './index.module.scss';
import Link from 'next/link';

const ListItem = ({item, displayListing}) => {
  const formatDate = dateString => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderSubtitle = () => {
    if (item.type === 'playlist') {
      return `Playlist • ${item?.audios?.length}`;
    } else if (item.type === 'album') {
      return `Album • ${item?.album?.artist?.name}`;
    } else if (item.type === 'artist') {
      return `Artiste`;
    }
  };

  const handleOpenPlaylist = () => {
    return `/${item.type}s/${item.id}`;
  };

  return (
    <Link className={styles.listItem} href={handleOpenPlaylist()}>
      <div className={styles.left}>
        <div className={`${styles.iconContainer} ${styles[item.type]}`}>
          {item.album ? (
            <img
              src={item?.album?.thumbnail}
              alt={item.name}
              className={styles.albumImage}
            />
          ) : (
            <FaMusic />
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.title}>{item.name}</div>
          <div className={styles.subtitle}>{renderSubtitle()}</div>
        </div>
      </div>
      {displayListing && (
        <div className={styles.dateAdded}>{formatDate(item.updated_at)}</div>
      )}
    </Link>
  );
};

export default ListItem;
