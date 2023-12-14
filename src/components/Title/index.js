import React from 'react';

const Title = props => {
  switch (props.type) {
    case 'h1':
      return <h1 className={props.className}>{props.children}</h1>;
    case 'h2':
      return <h2 className={props.className}>{props.children}</h2>;
    case 'h3':
      return <h3 className={props.className}>{props.children}</h3>;
    case 'h4':
      return <h4 className={props.className}>{props.children}</h4>;
    case 'h5':
      return <h5 className={props.className}>{props.children}</h5>;
    case 'h6':
      return <h6 className={props.className}>{props.children}</h6>;
    default:
      return <div className={props.className}>{props.children}</div>;
  }
};

export default Title;
