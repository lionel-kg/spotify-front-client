import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/styles.scss';
import {useRouter} from 'next/router';
import MainLayout from '../layouts/MainLayout';
import {AudioPlayerProvider} from '@/context/PlayerContext';
import {PlaylistProvider} from '@/context/PlaylistContext';
import CustomAudioPlayer from '@/components/CustomPlayer';
import localFont from 'next/font/local';

const myFont = localFont({
  src: '../../public/fonts/CircularSpotifyText-Medium.otf',
});

function MyApp({Component, pageProps}) {
  const router = useRouter();
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
