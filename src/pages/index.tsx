import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FC, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import BorderBox from '../components/border-box/BorderBox';
import ConsoleContainer from '../components/console-container/ConsoleContainer';
import Padded from '../components/padded/padded';
import { usePageCells } from '../hooks/pageCells';
import Heading from '../parts/heading/heading';
import Info from '../parts/info-part/info.part';
import Splash from '../parts/splash-part/splash.part';

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
  const cells = usePageCells();
  const scrollbarRef = useRef<SimpleBar>(null);

  const disableSideLines = cells.hCells < 50;

  return (
    <ConsoleContainer
      vCells={cells.vCells}
      hCells={cells.hCells}
      showDimensions={false}
    >
      <Padded bottom={0}>
        <Heading hCells={cells.hCells} />
      </Padded>

      <Padded
        left={disableSideLines ? 0 : 1}
        right={disableSideLines ? 0 : 1}
        bottom={0}
      >
        <BorderBox
          vCells={cells.vCells - 7}
          hCells={cells.hCells - (disableSideLines ? 0 : 2)}
          minVCells={6}
          disableSideLines={disableSideLines}
        >
          <SimpleBar
            ref={scrollbarRef}
            scrollableNodeProps={{ id: 'scrollable-content' }}
            style={{ maxHeight: '100%' }}
          >
            <Splash
              scrollbarRef={scrollbarRef}
              vCells={cells.vCells - 7 > 6 ? cells.vCells - 7 : 6}
              hCells={cells.hCells - (disableSideLines ? 0 : 4)}
            />
            <Info
              vCells={cells.vCells - 7 > 6 ? cells.vCells - 7 : 6}
              hCells={cells.hCells - (disableSideLines ? 0 : 4)}
            />
          </SimpleBar>
        </BorderBox>
      </Padded>

      <Padded top={0} bottom={0}>
        <div id="copyright" role="presentation">
          ©2021 - Maurice el-Banna
        </div>
      </Padded>
    </ConsoleContainer>
  );
};

export default HomePage;
