import React, {useEffect, useState} from 'react';
import PageTitle from '../components/PageTitle';
import Section from '../components/Section/index';
import audioService from '@/services/audio.service';
import Card from '@/components/Card';
export default function Home() {
  const [audios, setAudios] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    audioService.getAudios().then(res => {
      setAudios(res);
      setLoading(false);
      console.log(audios);
    });
  }, []);
  return (
    <div className="">
      {loading === false ? (
        <Section title="Ecouté recemment" cards={audios} />
      ) : (
        <></>
      )}
    </div>
  );
}
