import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Centered } from '../../components/centered/centered';
import { Container } from '../../components/container/container';
import styles from './heading.module.scss';

export const Heading: FC = () => {
  const { t } = useTranslation();

  return (
    <Centered horizontal>
      <div id={styles.menu}>
        <Container
          dimensions={{
            hCells: 9
          }}
          padding={{ top: 1, left: 1, right: 1 }}
          widthUnset
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">{t('menu.home')}</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a
            href="https://docs.google.com/document/d/1eeS4q_ZM9oVa7MSWa7vioDqNYrcszdxvgH17buF8l5M/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            {t('menu.cv')}
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a
            href="https://www.linkedin.com/in/maurice-elbanna/"
            target="_blank"
            rel="noreferrer"
          >
            {t('menu.linkedin')}
          </a>
        </Container>
      </div>
    </Centered>
  );
};
