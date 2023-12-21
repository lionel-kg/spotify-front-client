import React, {
  useState,
  useEffect,
  useRef,
  useDeferredValue,
  Suspense,
  lazy,
  useCallback,
} from 'react';
import styles from './index.module.scss';
import Skeleton from 'react-loading-skeleton';

//Services
import albumService from '@/services/album.service';
import artistService from '@/services/artist.service';
import audioService from '@/services/audio.service';

//Components
import PageTitle from '@/components/PageTitle';
import Section from '@/components/Section';
import SearchBar from '@/components/Search/SearchBar';

const CardComponent = lazy(() => import('@/components/Search/Card'));
const TrackList = lazy(() => import('@/components/Search/TrackList'));
const BestResult = lazy(() => import('@/components/Search/BestResult'));

const Index = () => {
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const deferredQuery = useDeferredValue(input);

  const [bestArtist, setBestArtist] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const [audioData, setAudioData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const callRef = useRef(null);

  const handleChange = useCallback(e => {
    setInput(e.target.value);
  }, []);

  const clearInput = useCallback(e => {
    setInput('');
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (deferredQuery?.length > 0) {
      setIsLoading(true);
      clearTimeout(callRef.current);
      callRef.current = setTimeout(async () => {
        try {
          Promise.all([
            audioService.searchAudios(deferredQuery),
            artistService.searchArtists(deferredQuery),
            albumService.searchAlbums(deferredQuery),
          ]).then(res => {
            setAudioData(res[0]);
            setArtistData(res[1]);
            setBestArtist(res[1][0]);
            setAlbumData(res[2]);
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      // Clear data when input is cleared
      setArtistData([]);
      setAlbumData([]);
      setAudioData([]);
    }

    return () => clearTimeout(callRef.current);
  }, [deferredQuery]);

  return (
    <div className={styles.search_container}>
      <SearchBar
        onSearch={handleChange}
        onDelete={clearInput}
        inputRef={inputRef}
        value={input}
      />
      {input ? (
        <div className={styles.search_results}>
          {artistData.length <= 0 &&
            audioData.length <= 0 &&
            albumData.length <= 0 &&
            !isLoading && (
              <div className={styles.no_result}>
                <p>Aucun résultat pour "{input}"</p>
                <p>
                  Veuillez vérifier l'orthographe ou utiliser moins de mots-clés
                  ou d'autres mots-clés.
                </p>
              </div>
            )}
          <div className={styles.best_results}>
            {artistData.length > 0 && <BestResult artist={bestArtist} />}
            {audioData.length > 0 && (
              <TrackList tracks={audioData.slice(0, 4)} />
            )}
          </div>

          <div className={styles.slider_results}>
            {artistData.length > 0 && (
              <Section title="Artistes" cards={artistData} />
            )}

            {albumData.length > 0 && (
              <Section title="Albums" cards={albumData} />
            )}
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <PageTitle title="Parcourir tout" />

          <div className={styles.discover}>
            <Suspense fallback={<Skeleton />}>
              <CardComponent title="Musiques" bgColor="#dc148c" />
            </Suspense>
            <CardComponent title="Albums" bgColor="#006450" />
            <CardComponent title="Artistes" bgColor="#1e3264" />
            <CardComponent title="Dernières sorties" bgColor="#8e66ac" />
            <CardComponent title="Conçu pour vous" bgColor="#bc5900" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
