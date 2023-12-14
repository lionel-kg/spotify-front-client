import React from 'react';
import styles from './index.module.scss';
import Button from '../../Button';
import TitleIcon from '../../Title/TitleIcon';
import {useRouter} from 'next/router';

//Icons
import {LuLibrary} from 'react-icons/lu';
import {FaPlus} from 'react-icons/fa6';
// import {FaArrowRight} from 'react-icons/fa';
import {FaArrowRight} from 'react-icons/fa6'; //elle plutôt

const Index = () => {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <TitleIcon type="h2" className={styles.title}>
        <LuLibrary /> <p> Bibliothèque </p>
      </TitleIcon>
      <div className={styles.buttons}>
        <Button>
          <FaPlus />
        </Button>

        <Button>
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Index;
