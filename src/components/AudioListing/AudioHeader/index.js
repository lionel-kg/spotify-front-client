// components/Music.js
import React from 'react';
import styles from './index.module.scss';

const Index = ({title, duration}) => {
  return (
    <div className={styles.trackListHeader}>
      <span>#</span>
      <span>Titre</span>
      <span>Durée</span>
    </div>
  );
};

export default Index;
