import React from 'react';
import styles from './index.module.scss'; // You would need to create this CSS module

const Index = ({ value, onChange, sliderBackground, min, max, step }) => {
  const sliderStyles = {
    background: sliderBackground,
    width: '100%',
    height: '5px',
    borderRadius: '4px',
    outline: 'none'
  };

  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        style={sliderStyles}
      />
    </div>
  );
};

export default Index;