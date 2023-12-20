import React, {useState, useEffect} from 'react';
import styles from './index.module.scss';
import Button from '@/components/Button';

const Index = props => {
  const [selected, setSelected] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    props.setCategorie(
      props.categorie !== props.children ? props.children : '',
    );
  };

  useEffect(() => {
    setSelected(props.categorie === props.children);
  }, [props.categorie]);

  return (
    <Button
      {...props}
      className={`${styles.categorie} ${selected ? styles.selected : ''}`}
      onClick={handleSubmit}>
      {props.children}
    </Button>
  );
};

export default Index;
