import React, {useState, useEffect, useContext} from 'react';
import styles from './index.module.scss';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import {usePlaylists} from '@/context/PlaylistContext';

const Index = props => {
  const {items} = props;
  const [listItems, setListItems] = useState(items);
  const {playlists, albums} = usePlaylists();

  useEffect(() => {
    let items = [];

    if (!props.categorie || props.categorie === 'playlist') {
      items.push(
        ...Object.keys(playlists).map(key => {
          return {
            id: key,
            name: key,
            type: 'playlist',
            ...playlists[key],
          };
        }),
      );
    }

    if (!props.categorie || props.categorie === 'album') {
      items.push(
        ...Object.keys(albums).map(key => {
          return {
            id: key,
            name: albums[key].album.title,
            type: 'album',
            ...albums[key],
          };
        }),
      );
    }
    // rajouter les artistes

    setListItems(items);
  }, [playlists, albums, props.categorie]);

  return (
    <div className={styles.list_container}>
      {listItems && props.displayListing && <ListHeader />}
      {listItems?.map(item => (
        <ListItem
          key={item.id}
          item={item}
          displayListing={props.displayListing}
        />
      ))}
    </div>
  );
};

export default Index;
