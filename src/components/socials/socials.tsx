import styles from './socials.module.scss';

export default function Socials() {
  return (
    <>
      <div className={styles.socialLink}>
        <div className={`${styles.image} ${styles.li}`}></div>
        <a
          href="https://www.linkedin.com/in/maurice-elbanna/"
          target="_blank"
          rel="noreferrer"
        >
          /maurice-elbanna
        </a>
      </div>
      <div className={styles.socialLink}>
        <div className={`${styles.image} ${styles.so}`}></div>
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
}
