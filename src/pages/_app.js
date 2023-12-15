import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/styles.scss';
import {useRouter} from 'next/router';
import MainLayout from '../layouts/MainLayout';
import CustomAudioPlayer from '@/components/CustomPlayer';

function MyApp({Component, pageProps}) {
  const router = useRouter();
  return (
    <div>
      <main>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
        <CustomAudioPlayer />
      </main>
      <ToastContainer />
    </div>
  );
}

export default MyApp;
