import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Progressbar } from '../../../components/progressbar/progressbar';

export const Skills: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('skills.heading')}</h2>
      <br />

      <div>{t('skills.frontend_heading')}</div>
      <Progressbar title="JavaScript(+TS)" percent={90} />
      <Progressbar title="Angular" percent={80} />
      <Progressbar title="HTML &amp; CSS/SCSS" percent={70} />
      <Progressbar title="React" percent={65} />
      <br />

      <div>{t('skills.backend_heading')}</div>
      <Progressbar title="Java" percent={75} />
      <Progressbar title="Node JS" percent={60} />
      <br />

      <div>{t('skills.database_heading')}</div>
      <Progressbar title="Oracle" percent={50} />
      <Progressbar title="PostgreSQL" percent={45} />
      <Progressbar title="MongoDB" percent={25} />
    </>
  );
};
