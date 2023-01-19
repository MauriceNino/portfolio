import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FC } from 'react';
import 'simplebar/src/simplebar.css';
import { Info } from '../parts/info-part/info.part';
import { Splash } from '../parts/splash-part/splash.part';

// Parse the accept-language header to an array of locales
const getLocales = (str: string | undefined): string[] => {
  return (
    str
      ?.split(',')
      .map(l => l.split(';')[0].trim())
      .filter(l => l !== '*') ?? []
  );
};

// find all available locales, that would match the accept-language header (by our own definition)
const getMatchingLocales = (
  acceptedLocales: string[],
  availableLocales: string[]
): string[] => {
  return acceptedLocales.reduce<string[]>((acc, locale) => {
    // find available locale that is included by the current accepted language
    const availableLocale = availableLocales.find(availableLocale =>
      locale.includes(availableLocale)
    );

    // if there is a matching locale, add it to the list, but only once
    if (availableLocale && !acc.includes(availableLocale)) {
      acc.push(availableLocale);
    }

    return acc;
  }, []);
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
  locales
}) => {
  // Read the accepted locales from the headers
  const acceptedLanguages = req.headers['accept-language'];
  const acceptedLocales = getLocales(acceptedLanguages);

  // Find matching locale/language from the available locales
  const foundLocales = getMatchingLocales(acceptedLocales, locales!);

  if (foundLocales.length !== 0 && foundLocales[0] !== locale) {
    return {
      redirect: {
        permanent: false,
        destination: `/${foundLocales[0]}`
      }
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};

const HomePage: FC = () => {
  return (
    <>
      <Splash />
      <Info />
    </>
  );
};

export default HomePage;
