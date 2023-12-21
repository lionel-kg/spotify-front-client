import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import ArtistContent from '@/components/ArtistContent';
import artistService from '@/services/artist.service';

const Index = () => {
  const router = useRouter();
  const {id} = router.query;
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      if (id) {
        try {
          const artistData = await artistService.getArtistById(id);
          setArtist(artistData);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchArtist();
  }, [id]);

  return <>{artist && <ArtistContent artist={artist} />}</>;
};

export default Index;
