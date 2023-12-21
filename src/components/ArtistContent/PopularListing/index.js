import React, {useState} from 'react';
import styles from './index.module.scss';
import AudioItem from '@/components/AudioListing/AudioItem';
import Title from '@/components/Title';

const Index = ({audios}) => {
  const [displayedAudios, setDisplayAudios] = useState(audios?.slice(0, 5));

  const toggleDisplay = () => {
    if (displayedAudios.length > 5) {
      setDisplayAudios(audios?.slice(0, 5));
    } else {
      setDisplayAudios(audios);
    }
  };

  return (
    <div className={styles.popularAudios}>
      <Title type="h2">Populaires</Title>
      <ul>
        {displayedAudios.map((audio, index) => (
          <AudioItem key={audio.id} audio={audio} index={index} />
        ))}
      </ul>

      <button className={styles.showMore} onClick={toggleDisplay}>
        {displayedAudios.length > 5 ? 'Afficher moins' : 'Afficher plus'}
      </button>
    </div>
  );
};

export default Index;
