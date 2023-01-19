import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';
import { i18n } from '../../../next-i18next.config';
import { useIsSSR } from '../../hooks/isSSR';
import Loader from '../../parts/loader/loader';

export const PageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const [initialized, setInitialized] = useState<boolean>(false);
  const isProd = useRef(process.env.isProd as any as boolean);

  const gtmId = useRef(process.env.gtmId!);
  const hotjarSiteId = useRef(+process.env.hotjarSiteId!);

  useEffect(() => {
    if (isProd.current === true) {
      // Init Google Tag Manager / Analytics
      TagManager.initialize({
        gtmId: gtmId.current
      });

      // Init Hotjar
      hotjar.initialize(hotjarSiteId.current, 6);
    }

    // Give the page time to load
    setTimeout(() => setInitialized(true), 100);
  }, []);

  const isSSR = useIsSSR();

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

      {children}
    </>
  );
};
