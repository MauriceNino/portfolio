import { Grid } from 'react-loader-spinner';
import styles from './loader.module.scss';

const Loader = () => {
  return (
    <div id={styles.spinnerContainer}>
      <Grid color="#43c18b" height={80} width={80} />
    </div>
  );
};

export default Loader;
