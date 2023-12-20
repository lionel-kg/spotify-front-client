// components/MusicList.js
import React from 'react';
import AudioItem from './AudioItem';
import AudioHeader from './AudioHeader';
import styles from './index.module.scss';

const MusicList = ({album}) => {
  return (
    <>
      <AudioHeader />
      <div className={styles.audioList}>
        {album?.audios?.map((audio, index) => (
          <AudioItem audio={audio} index={index} album={album} />
        ))}
      </div>
    </>
  );
};

export default MusicList;
