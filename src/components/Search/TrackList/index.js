import Track from '@/components/Search/Track';
import styles from './index.module.scss';

const Index = ({tracks}) => {
  return (
    <div className={styles.list}>
      <h2>Audio</h2>
      <div className={styles.list_content}>
        {tracks.map((track, index) => (
          <Track key={index} track={track} />
        ))}
      </div>
    </div>
  );
};

export default Index;
