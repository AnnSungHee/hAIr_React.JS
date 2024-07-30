import React, { useState } from 'react';
import '../assets/styles/components/BotChatComponentStyle.css';

const BotChatComponent = ({ text, images, onImageClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };


  return (
    <div className='botChatBox'>
      <div className='botImg'><img src="/chatbot.png" alt="bot profile" /></div>
      <span className='botTxtNImgs'>
        <p className='bot'>{text}</p>
        {images && images.length > 0 && (
          <div className='hairstyleImagesContainer'>
            {images.map((img, index) => (
              <div key={index} className='hairstyleImage'>
                <img src={img} alt={`hairstyle-${index}`} onClick={() => handleImageClick(img)} />
                <button onClick={() => onImageClick(img)}>적용하기</button>
              </div>
            ))}
          </div>
        )}
      </span>
    </div>
  );
};

export default BotChatComponent;
