import React, { useState } from 'react';
import styles from './index.module.scss'; // You would need to create this CSS module

const Index = ({ value, onChange, min, max, step }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getSliderBackground = () => {
    const percentage = (value / max) * 100;
    const colorFilled = isHovered ? '#1db954' : '#ffffff';
    const colorUnfilled = '#4d4d4d';
    return `linear-gradient(to right, ${colorFilled} 0%, ${colorFilled} ${percentage}%, ${colorUnfilled} ${percentage}%, ${colorUnfilled} 100%)`;
  };

  const sliderStyles = {
    background: getSliderBackground(),
  };

  return (
    <div
      className={styles.slider}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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