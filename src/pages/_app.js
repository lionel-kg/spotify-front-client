import React, {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/styles.scss';
import {useRouter} from 'next/router';
import MainLayout from '../layouts/MainLayout';
import {AudioPlayerProvider} from '@/context/PlayerContext';
import {PlaylistProvider} from '@/context/PlaylistContext';
import CustomAudioPlayer from '@/components/CustomPlayer';
import localFont from 'next/font/local';
import socketService from '@/services/socketIo.service';

const myFont = localFont({
  src: '../../public/fonts/CircularSpotifyText-Medium.otf',
});

function MyApp({Component, pageProps}) {
  const router = useRouter();
  // useEffect(() => {
  //   // Initialiser la connexion au socket ici
  //   socketService.connect();

  //   // Nettoyer la connexion au socket lors du démontage du composant
  //   return () => {
  //     socketService.disconnect();
  //   };
  // }, []);
  return (
    <PlaylistProvider>
      <AudioPlayerProvider>
        <div className={`main ${myFont.className}`}>
          <main>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
            <CustomAudioPlayer />
          </main>
          <ToastContainer />
        </div>
      </AudioPlayerProvider>
    </PlaylistProvider>
  );
}

export default MyApp;
