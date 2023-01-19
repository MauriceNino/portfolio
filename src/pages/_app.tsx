import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { PageLayout } from '../components/page-layout/page-layout';
import { PageCellsProvider } from '../hooks/pageCells';
import './_app.scss';

function AppBase({ Component, pageProps }: AppProps) {
  return (
    <PageCellsProvider>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </PageCellsProvider>
  );
}
export default appWithTranslation(AppBase);
