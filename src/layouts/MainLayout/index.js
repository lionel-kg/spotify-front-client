import React from 'react';
import styles from './index.module.scss';
import Navbar from '../../components/Navbar';
import Library from '../../components/Library';

const Index = () => {
  return (
    <div className={styles.main___layout}>
      <div className={styles.left__layout}>
        <Navbar />
        <Library />
      </div>
      <div className={styles.droite}></div>
    </div>
  );
};

export default Index;
