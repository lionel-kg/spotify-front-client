import React, {useState} from 'react';
import styles from './index.module.scss';
import CategorieItem from './CategorieItem';

const Index = props => {
  const categories = ['playlist', 'artiste', 'album'];
  console.log('props', props);
  return (
    <div className={styles.categories__container}>
      {categories &&
        categories.map(item => (
          <CategorieItem key={item} {...props}>
            {item}
          </CategorieItem>
        ))}
    </div>
  );
};

export default Index;
