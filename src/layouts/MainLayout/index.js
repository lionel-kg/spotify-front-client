// layouts/MainLayout.js
import React, {useState} from 'react';
import styles from './index.module.scss';
import Navbar from '@/components/NavBar';
import Library from '@/components/Library';

const Index = ({children}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={`${styles.main__layout} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.left__layout}>
        <Navbar />
        <Library setIsExpanded={setIsExpanded} />
      </div>
      <div className={styles.right__layout}>{children}</div>
    </div>
  );
};

export default Index;
