import React from 'react';
import styles from './index.module.scss';
import Navbar from '../../components/NavBar';
import Library from '../../components/Library';

const Index = ({children}) => {
  return (
    <div className={styles.main___layout}>
      <div className={styles.left__layout}>
        <Navbar />
        <Library />
      </div>
      <div className={styles.droite}>{children}</div>
    </div>
  );
};

export default Index;
