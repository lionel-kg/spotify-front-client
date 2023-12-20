import styles from './index.module.scss';

const Index = props => {
  return (
    <button
      className={`${styles.btn} ${props.className}`}
      onClick={props.onClick}
      type={props.type}>
      {props.children}
    </button>
  );
};

export default Index;
