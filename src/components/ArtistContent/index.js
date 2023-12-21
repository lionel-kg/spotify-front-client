import React from 'react';
import ArtistHeader from './ArtistHeader';
import PopularListing from './PopularListing';
import Discography from './DiscographyListing';

const Index = ({artist}) => {
  console.log('artist', artist);

  return (
    <div>
      <ArtistHeader artist={artist} />
      <PopularListing audios={artist.audios} />
      <Discography albums={artist.albums} />
    </div>
  );
};

export default Index;
