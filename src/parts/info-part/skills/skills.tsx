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
      <Progressbar title="JavaScript(+TS)" percent={95} />
      <Progressbar title="React" percent={90} />
      <Progressbar title="HTML &amp; CSS/SCSS" percent={80} />
      <Progressbar title="Angular" percent={65} />
      <br />

      <div>{t('skills.backend_heading')}</div>
      <Progressbar title="Node JS" percent={70} />
      <Progressbar title="Java" percent={60} />
      <br />

      <div>{t('skills.database_heading')}</div>
      <Progressbar title="Oracle" percent={50} />
      <Progressbar title="PostgreSQL" percent={45} />
      <Progressbar title="MongoDB" percent={25} />
    </>
  );
};
