import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import AlbumContent from '@/components/AlbumContent';
import albumService from '@/services/album.service';

const Index = () => {
  const router = useRouter();
  const {id} = router.query;
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (id) {
        try {
          const albumData = await albumService.getAlbumById(id);
          console.log('albumData', albumData);
          setAlbum(albumData);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchAlbum();
  }, [id]);

  return <>{album && <AlbumContent album={album} />}</>;
};

export default Index;
