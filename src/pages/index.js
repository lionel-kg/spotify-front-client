import React, {useEffect, useState} from 'react';
import PageTitle from '../components/PageTitle';
import Section from '../components/Section/index';
import {getAudios} from '@/services/audio.service';
import Card from '@/components/Card';
export default function Home() {
  const [audios, setAudios] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAudios().then(res => {
      setAudios(res);
      setLoading(false);
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
