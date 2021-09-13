import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './_app.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default appWithTranslation(MyApp);
