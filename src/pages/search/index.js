import React, { useState, useEffect, useRef, useDeferredValue } from "react";
import styles from './index.module.scss';

//Services
import { searchAlbums } from "@/services/album.service";
import { searchArtists } from "@/services/artist.service";
import { searchAudios } from "@/services/audio.service";
//Components
import Section from "@/components/Section";
import Card from "@/components/Card";
import SearchBar from "@/components/Search/SearchBar";
import TrackList from '@/components/Search/TrackList';
import BestResult from "@/components/Search/BestResult";

const Index = () => {

  const [input, setInput] = useState('');
  const deferredQuery = useDeferredValue(input);

  const [bestArtist, setBestArtist] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const [audioData, setAudioData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const callRef = useRef(null);

  const handleChange = e => {
    setInput(e.target.value);
  };


  useEffect(() => {
    if (input.length > 0) {
      setIsLoading(true);
      clearTimeout(callRef.current);
      callRef.current = setTimeout(async () => {
        try {
          Promise.all([searchAudios(deferredQuery), searchArtists(deferredQuery), searchAlbums(deferredQuery)]).then((res) => {
            setAudioData(res[0]);
            setArtistData(res[1]);
            setBestArtist(res[1][0]);
            setAlbumData(res[2]);
          })
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
          console.log(bestArtist);
        }
      }, 300)
    } else {
      // Clear data when input is cleared
      setArtistData([]);
      setAlbumData([]);
      setAudioData([]);
    }

    return () => clearTimeout(callRef.current);
  }, [input]);

  return (
    <div>
      <SearchBar onSearch={handleChange} />
      <div className={styles.search_results}>
        <div className={styles.best_results}>
          <BestResult artist={bestArtist} />
          {audioData.length > 0 && (
            <TrackList tracks={audioData.slice(0, 4)} />
          )}
        </div>

        {artistData.length > 0 && (
          <Section title="Artistes" cards={artistData} />
        )}

        {albumData.length > 0 && (
          <Section title="Artistes" cards={albumData} />
        )}
      </div>
    </div>
  );
}

export default Index;