import React from 'react';

const Banner = ({ title, subtitle, buttonText, buttonLink }) => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <a href={buttonLink} className="banner-button">{buttonText}</a>
      </div>
    </div>
  );
};

export default Banner;
