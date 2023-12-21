import React, {useEffect, useState, useRef, useCallback} from 'react';
import Section from '../components/Section/index';
import audioService from '@/services/audio.service';
import albumService from '@/services/album.service';
import {usePlayer} from '@/context/PlayerContext';

export default function Home() {
  const [audios, setAudios] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxNbResults, setMaxNbResults] = useState(100);
  const loaderRef = useRef(null);
  const {history} = usePlayer();

  // Fonction pour charger les audios avec pagination
  const loadAudios = useCallback(page => {
    setLoading(true);
    try {
      audioService
        .getAudiosPagination(page)
        .then(newAudios => {
          setMaxNbResults(newAudios.nbResults);
          if (newAudios.audios.length > 0) {
            setAudios(prevAudios => [...prevAudios, ...newAudios.audios]);
          }
        })
        .catch(error => {
          console.error('Error fetching more audios:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Intersection Observer pour gérer le défilement infini
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Si l'élément observé est visible et qu'on n'est pas en train de charger
        if (entries[0].isIntersecting && !loading) {
          setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
        }
      },
      {
        root: null, // par rapport au viewport
        rootMargin: '0px',
        threshold: 1.0, // Lorsque 100% de l'élément est visible
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // Nettoyage
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading]);

  // Effectuer le chargement des audios lors du changement de page
  useEffect(() => {
    if (currentPage > 1 && maxNbResults > audios.length)
      loadAudios(currentPage);
  }, [currentPage, loadAudios, maxNbResults]);

  // Charger initialement les données
  useEffect(() => {
    Promise.all([
      audioService.getAudiosPagination(currentPage),
      albumService.getAlbums(),
    ])
      .then(([{audios}, albumsResult]) => {
        setAudios(audios);
        setAlbums(albumsResult);
      })
      .catch(error => {
        console.error('Error fetching initial data:', error);
      })
      .finally(() => {
        setLoading(false);
      });

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const bestHistory = history
    .slice()
    .sort((a, b) => b.listens - a.listens)
    .slice(0, 20);

  const lastHistory = history
    .slice()
    .sort((a, b) => new Date(b.playedAt) - new Date(a.playedAt))
    .slice(0, 20);

  return (
    <div>
      {!loading && (
        <>
          {lastHistory.length > 0 && (
            <Section
              title="Écouté récemment"
              cards={lastHistory}
              isAlbum={false}
            />
          )}
          <Section title="Albums" cards={albums} isAlbum />
          <Section title="Musiques" cards={audios} isAlbum={false} />
          <div ref={loaderRef} className="loading-indicator">
            {loading && <p>Chargement...</p>}
          </div>
        </>
      )}
    </div>
  );
}
