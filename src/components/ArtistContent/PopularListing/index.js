import React from 'react';
import styles from './index.module.scss';
import AudioItem from '@/components/AudioListing/AudioItem';

const Index = ({audios}) => {
  return (
    <section className={styles.popularAudios}>
      <h2>Populaires</h2>
      <ul>
        {audios?.map((audio, index) => (
          <AudioItem audio={audio} index={index} />
        ))}
      </ul>
      <button className={styles.showMore}>Afficher plus</button>
    </section>
  );
};

export default Index;
