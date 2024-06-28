import React from 'react';

const hairstyleListComponent = ({ hairstyleData }) => {
  return (
    <div>
      {hairstyleData.map((style, index) => (
        <div key={index}>
          <img src={style.imageUrl} alt={`Hairstyle ${index}`} />
          <p>{style.description}</p>
        </div>
      ))}
    </div>
  );
};

export default hairstyleListComponent;
