import React, {useState, useEffect} from 'react';
import styles from './index.module.scss';
import Header from './Header';
import List from './List';
import {useRouter} from 'next/router';

const Index = ({setIsExpanded}) => {
  const router = useRouter();
  const [displayListing, setDisplayListing] = useState(false);
  const [categorie, setCategorie] = useState('');

  useEffect(() => {
    setIsExpanded(displayListing);
  }, [displayListing]);

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
