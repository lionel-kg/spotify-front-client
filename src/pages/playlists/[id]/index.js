import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import PlaylistContent from '@/components/PlaylistContent';
import {usePlaylists} from '@/context/PlaylistContext';

const Index = () => {
  const router = useRouter();
  const {id} = router.query;
  const [playlist, setPlaylist] = useState(null);
  const {playlists} = usePlaylists();

  useEffect(() => {
    if (id) {
      setPlaylist({
        id,
        name: id,
        type: 'playlist',
        ...playlists[id],
      });
    }
  }, [id]);

  return (
    <>
      <PlaylistContent playlist={playlist} />
    </>
  );
};

export default Index;
