import React, {useEffect, useState, useCallback} from 'react';
import PageTitle from '../../components/PageTitle';
import {usePlayer} from '@/context/PlayerContext';
import Track from '@/components/Search/Track';
import styles from './index.module.scss';
const Index = () => {
  const {playlist, indexPlaylist, setIndexPlaylist} = usePlayer();

  return (
    <div className={styles.container_queue}>
      <PageTitle title="Queue" />
      <p>Titre en écoute :</p>
      <p className={styles.current}>{playlist[indexPlaylist].title}</p>

      <p>A suivre :</p>
      <div>
        {playlist?.slice(indexPlaylist + 1).map((audio, index) => (
          <p onClick={e => setIndexPlaylist(index + indexPlaylist + 1)}>
            {audio?.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Index;
