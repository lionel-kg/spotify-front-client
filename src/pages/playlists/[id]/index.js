import React from 'react';
import {useRouter} from 'next/router';
// import MainLayout from '@/layouts/MainLayout';
import PlaylistContent from '@/components/PlaylistContent';

const Index = () => {
  const router = useRouter();
  // const {id} = router.query; // Obtenez l'identifiant de la playlist de l'URL

  return (
    <>
      {/* <PlaylistContent albumId={id} /> */}
      <PlaylistContent />
    </>
  );
};

export default Index;
