import React, {useEffect, useState, useCallback} from 'react';
import PageTitle from '../../components/PageTitle';
import {usePlayer} from '@/context/PlayerContext';
import Track from '@/components/Search/Track';
const Index = () => {
  const {playlist, indexPlaylist, setIndexPlaylist} = usePlayer();

  return (
    <div>
      <PageTitle title="Queue" />
      <p>Titre en écoute :</p>
      <p>{playlist[indexPlaylist].title}</p>

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
