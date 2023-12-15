import React, {useState} from 'react';
import styles from './index.module.scss';
import Card from '../Card/index';
import PageTitle from '../PageTitle/index';

const Index = ({title, cards, CardComponent}) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggleShow = () => {
    setShowAll(!showAll);
  };

  return (
    <div className={styles.container_section}>
      <div className={styles.section_title}>
        <h2>{title}</h2>
        <div onClick={handleToggleShow} className={styles.show_button}>
          <p>{showAll ? 'Show less' : 'Show all'}</p>
        </div>
      </div>
      <div className={styles.container_card}>
        {cards.slice(0, showAll ? cards.length : 4).map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Index;
