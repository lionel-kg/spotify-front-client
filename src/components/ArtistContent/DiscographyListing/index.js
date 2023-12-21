import React, {useState} from 'react';
import styles from './index.module.scss';
import Title from '@/components/Title';

import Link from 'next/link';

const AlbumListing = ({albums}) => {
  const [visibleAlbums, setVisibleAlbums] = useState(5);

  const showMore = () => {
    setVisibleAlbums(prev => (prev <= 5 ? prev + 10 : 5));
  };

  return (
    <div className={styles.albumListing}>
      <div className={styles.header}>
        <Title type="h2">Discographie</Title>
        <button className={styles.showMoreButton} onClick={showMore}>
          {visibleAlbums <= 5 ? 'Tout afficher' : 'Réduire'}
        </button>
      </div>
      <div className={styles.albumGrid}>
        {albums.slice(0, visibleAlbums).map(album => (
          <Link className={styles.listItem} href={`/albums/${album.id}`}>
            <div className={styles.albumCard} key={album.id}>
              <img
                src={album.thumbnail}
                alt={album.title}
                className={styles.albumCover}
              />
              <div className={styles.albumInfo}>
                <Title type="h3">{album.title}</Title>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AlbumListing;
