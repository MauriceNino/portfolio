import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';
import { i18n } from '../../next-i18next.config';
import { useSSRCheck } from '../helpers/isSSRHook';
import Loader from '../parts/loader/loader';
import { CellProps } from '../types/default-props';
import HomePage from './home.page';

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});

const getCurrentState = (): CellProps => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    hCells: Math.floor(width / 9.6),
    vCells: Math.floor(height / 21)
  };
};

const App = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<CellProps>({
    hCells: 50,
    vCells: 20
  });
  const [initialized, setInitialized] = useState<boolean>(false);
  const gtmId = useRef(process.env.gtmId!);
  const hotjarSiteId = useRef(+process.env.hotjarSiteId!);

  useEffect(() => {
    // Init Google Tag Manager / Analytics
    TagManager.initialize({
      gtmId: gtmId.current
    });

    // Init Hotjar
    hotjar.initialize(hotjarSiteId.current, 6);

    // Set initial resize state
    setState(getCurrentState());

    // Give the page time to load
    setTimeout(() => setInitialized(true), 100);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newState = getCurrentState();

      if (
        state.hCells !== newState.hCells ||
        state.vCells !== newState.vCells
      ) {
        setState(newState);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [state]);

  const isSSR = useSSRCheck();

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <link rel="icon" href="favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t('meta.description')} />
        <link rel="apple-touch-icon" href="logo192.png" />
        <link rel="manifest" href="manifest.json" />
        {i18n.locales.map(locale => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={`https://mauz.io/${locale}`}
          />
        ))}

        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:image" content="https://mauz.io/logo512.png" />
        <meta property="og:url" content="https://mauz.io" />
        <meta name="twitter:card" content="summary" />

        <meta property="og:site_name" content={t('meta.title')} />
        <meta name="twitter:image:alt" content="Logo" />
      </Head>

      {(isSSR || !initialized) && <Loader />}

      <HomePage vCells={state.vCells} hCells={state.hCells} />
    </>
  );
};

export default App;
