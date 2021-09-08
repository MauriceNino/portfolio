import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { i18n } from '../../next-i18next.config';
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

  useEffect(() => {
    setState(getCurrentState());
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

  return (
    <>
      <Head>
        <title>Maurice el-Banna //Portfolio</title>
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
      </Head>

      <HomePage vCells={state.vCells} hCells={state.hCells} />
    </>
  );
};

export default App;
