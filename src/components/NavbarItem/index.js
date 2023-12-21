import Link from 'next/link';
import styles from './index.module.scss';

const Index = props => {
  return (
    <Link
      className={`${styles.navbar_item} ${styles.displayListing}`}
      href={props.link}>
      <span>{props.icon}</span>
      {props.displayListing !== 'contracted' && <span>{props.title}</span>}
    </Link>
  );
};

export default Index;
