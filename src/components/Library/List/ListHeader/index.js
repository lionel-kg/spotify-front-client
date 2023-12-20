import React, {useState, useEffect} from 'react';
import styles from './index.module.scss';

const Index = props => {
  return (
    <div className={styles.list_header}>
      <div>Titre</div>
      <div>ajouté le</div>
    </div>
  );
};

export default Index;
