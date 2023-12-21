// pages/artist/[id].js
import React from 'react';
import ArtistHeader from './ArtistHeader';
import PopularListing from './PopularListing';
import Discography from './DiscographyListing';
// Ajoutez les données de l'artiste ici ou récupérez-les via une API

const Index = ({artist}) => {
  console.log('artist', artist);
  // Remplacez ceci par les données réelles récupérées
  const artistData = {
    /* ... */
  };
  const PopularListing = [
    /* ... */
  ];
  const albums = [
    /* ... */
  ];

  return (
    <main>
      <ArtistHeader artist={artist} />
      <PopularListing audios={artist.audios} />
      <Discography albums={artist.albums} />
    </main>
  );
};

export default Index;
