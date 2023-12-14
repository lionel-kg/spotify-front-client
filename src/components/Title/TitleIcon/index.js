import React from 'react';
import Title from '../index';

const TitleIcon = props => {
  return props.iconPosition === 'right' ? (
    <>
      <Title {...props}>{props.title}</Title>
      <div>{props.icon}</div>
    </>
  ) : (
    <>
      <div>{props.icon}</div>
      <Title {...props}>{props.title}</Title>
    </>
  );
};

export default TitleIcon;
