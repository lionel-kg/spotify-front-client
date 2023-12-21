import React from 'react';
import styles from './index.module.scss';
import NavbarItem from '../NavbarItem';
import {useRouter} from 'next/router';

//Icons
import {AiFillHome} from 'react-icons/ai';
import {FaSearch} from 'react-icons/fa';

const Index = props => {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <ul>
        <NavbarItem link="/" title="Accueil" icon={<AiFillHome />} {...props} />
        <NavbarItem
          link="/search"
          title="Recherche"
          icon={<FaSearch />}
          {...props}
        />
      </ul>
    </nav>
  );
};

export default Index;
