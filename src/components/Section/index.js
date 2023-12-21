import React, {useState, lazy, Suspense} from 'react';
import styles from './index.module.scss';
import PageTitle from '../PageTitle/index';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const wait = (delay, value) =>
  new Promise(resolve => setTimeout(resolve, delay, value));

const Card = lazy(() =>
  wait(1000) // Wait for 1000 milliseconds
    .then(() => import('../Card/index')),
);

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
          <Suspense
            fallback={
              <Skeleton
                height={200}
                baseColor="#202020"
                highlightColor="#444"
                enableAnimation={true}
              />
            }>
            <Card key={index} {...card} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default Index;
