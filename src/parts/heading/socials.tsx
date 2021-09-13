import Image from 'next/image';
import styles from './socials.module.scss';

const Socials = () => {
  return (
    <>
      <div className={styles.socialLink}>
        <div className={styles.image}>
          <Image
            layout="fill"
            src={'/assets/images/icon-linkedin.png'}
            objectFit="contain"
            alt=""
            role="presentation"
          />
        </div>
        <a
          href="https://www.linkedin.com/in/maurice-elbanna/"
          target="_blank"
          rel="noreferrer"
        >
          /maurice-elbanna
        </a>
      </div>
      <div className={styles.socialLink}>
        <div className={styles.image}>
          <Image
            layout="fill"
            src={'/assets/images/icon-so.png'}
            objectFit="contain"
            alt=""
            role="presentation"
          />
        </div>
        <a
          href="https://stackoverflow.com/users/9150652/mauricenino"
          target="_blank"
          rel="noreferrer"
        >
          /mauricenino
        </a>
      </div>
    </>
  );
};

export default Socials;
