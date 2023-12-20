import React from 'react';
import Title from '../index';
import styles from './index.module.scss';

const TitleIcon = props => {
  console.log(props);
  return props.iconPosition === 'right' ? (
    <div className={styles.container}>
      <Title {...props}>{props.title}</Title>
      {props.icon}
    </div>
  ) : (
    <div className={styles.container}>
      {props.icon}
      <Title {...props}>{props.title}</Title>
    </div>
  );
};

export default TitleIcon;
