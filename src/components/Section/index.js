import React, {useState, useEffect} from 'react';
import styles from './index.module.scss';
import Card from '../Card/index';
import PageTitle from '../PageTitle/index';

const Index = props => {
  const {title, songs} = props;
  const [showAll, setShowAll] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const displayedSongs = showAll ? songs : songs.slice(0, 4);

  const handleShowAllClick = () => {
    setShowAll(true);
    setShowLess(true);
  };

  const handleShowLessClick = () => {
    setShowAll(false);
    setShowLess(false);
  };

  useEffect(() => {
    console.log(songs);
  }, [songs]);

  return (
    <div className={styles.container_section}>
      <div className={styles.section_title}>
        <h2>{title}</h2>
        {!showAll && (
          <div onClick={handleShowAllClick} className={styles.show_button}>
            <p>Show all</p>
          </div>
        )}
        {showLess && (
          <div onClick={handleShowLessClick} className={styles.show_button}>
            <p>Show less</p>
          </div>
        )}
      </div>
      <div className={styles.container_card}>
        {displayedSongs.map(song => {
          return <Card key={song.id} song={song} />;
        })}
      </div>
    </div>
  );
};

export default Index;
