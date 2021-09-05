import Progressbar from '../../../../components/progressbar/progressbar';
import { HCellProps } from '../../../../types/default-props';

type SkillsProps = HCellProps;

const Skills = (props: SkillsProps) => {
  const hCells = props.hCells;

  return (
    <>
      <h2>My Skills</h2>
      <br />

      <div>Frontend</div>
      <Progressbar hCells={hCells} title="JavaScript(+TS)" percent={90} />
      <Progressbar hCells={hCells} title="Angular" percent={80} />
      <Progressbar hCells={hCells} title="HTML &amp; CSS/SCSS" percent={70} />
      <Progressbar hCells={hCells} title="React" percent={65} />
      <br />

      <div>Backend</div>
      <Progressbar hCells={hCells} title="Java" percent={75} />
      <Progressbar hCells={hCells} title="Node JS" percent={60} />
      <br />

      <div>Databases</div>
      <Progressbar hCells={hCells} title="Oracle" percent={50} />
      <Progressbar hCells={hCells} title="PostgreSQL" percent={45} />
      <Progressbar hCells={hCells} title="MongoDB" percent={25} />
    </>
  );
};

export default Skills;
