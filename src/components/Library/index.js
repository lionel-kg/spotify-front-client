import React, {useState, useEffect} from 'react';
import styles from './index.module.scss';
import Header from './Header';
import List from './List';

const Index = ({displayListing, setDisplayListing}) => {
  const [categorie, setCategorie] = useState('');

  return (
    <div
      className={`${styles.library} ${
        displayListing ? styles.displayMore : ''
      }`}>
      <Header
        setDisplayListing={setDisplayListing}
        displayListing={displayListing}
        setCategorie={setCategorie}
        categorie={categorie}
      />

      <div className={styles.listing}>
        <List categorie={categorie} displayListing={displayListing} />
      </div>
    </div>
  );
};

export default Index;
