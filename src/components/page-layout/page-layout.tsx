import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';
import { i18n } from '../../../next-i18next.config';
import { useIsSSR } from '../../hooks/isSSR';
import { usePageCells } from '../../hooks/pageCells';
import { ScrollbarProvider } from '../../hooks/scrollbar';
import { Heading } from '../../parts/heading/heading';
import { Loader } from '../../parts/loader/loader';
import { BorderBox } from '../border-box/BorderBox';
import { ConsoleContainer } from '../console-container/ConsoleContainer';
import { Container } from '../container/container';

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const cells = usePageCells();

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

  const disabledSidelines = cells.hCells < 50;

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

      <ConsoleContainer showDimensions={!isProd.current}>
        <Container
          padding={{ left: 1, right: 1, top: 1 }}
          dimensions={{
            vCells: 4
          }}
        >
          <Heading />
        </Container>

        <Container
          dimensions={{
            vCells: cells.vCells - 5
          }}
          padding={{
            left: disabledSidelines ? 0 : 1,
            right: disabledSidelines ? 0 : 1
          }}
        >
          <BorderBox minVCells={6} disabledSidelines={disabledSidelines}>
            <ScrollbarProvider>{children}</ScrollbarProvider>
          </BorderBox>
        </Container>

        <Container
          dimensions={{
            vCells: 1
          }}
          padding={{ right: 1 }}
        >
          <div id="copyright" role="presentation">
            ©2021 - Maurice el-Banna
          </div>
        </Container>
      </ConsoleContainer>
    </>
  );
};
