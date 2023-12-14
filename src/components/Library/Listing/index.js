import React from 'react';
import styles from './index.module.scss';
import NavbarItem from '../NavbarItem';
import {useRouter} from 'next/router';

//Icons
import {IoIosList} from 'react-icons/io';
import {FaSearch} from 'react-icons/fa';

const Index = () => {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <ul>
        <NavbarItem link="./" title="Home" icon={<AiFillHome />} />
        <NavbarItem link="/search" title="Search" icon={<FaSearch />} />
      </ul>
    </nav>
  );
};

export default Index;
