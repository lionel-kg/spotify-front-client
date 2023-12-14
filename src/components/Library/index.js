import React from 'react';
import styles from './index.module.scss';
import NavbarItem from '../NavbarItem';
import Header from './Header';
import {useRouter} from 'next/router';

//Icons
import {AiFillHome} from 'react-icons/ai';
import {FaSearch} from 'react-icons/fa';

const Index = () => {
  const router = useRouter();

  return (
    <div className={styles.library}>
      <Header />
    </div>
  );
};

export default Index;
