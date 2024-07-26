import React, { useState } from 'react';
import ImageModalComponent from './ImageModalComponent';
import '../assets/styles/components/BotChatComponentStyle.css';

const BotChatComponent = ({ text, images, onImageClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className='botChatBox'>
      <div className='botImg'><img src="/chatbot.png" alt="bot profile" /></div>
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

      <ImageModalComponent isOpen={isModalOpen} onClose={handleModalClose}>
        {selectedImage && <img src={selectedImage} alt="Selected hairstyle" className="modal-image" />}
      </ImageModalComponent>
    </div>
  );
};

export default BotChatComponent;
