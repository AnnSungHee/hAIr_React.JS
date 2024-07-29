import React from 'react';
import axios from 'axios';
import '../assets/styles/components/HairstyleComponentStyle.css';

const HairstyleComponent = ({ imageUrl, onDelete }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = imageUrl.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  const handleDelete = () => {
    onDelete(imageUrl);
  };

  return (
    <div className='hairstyleComponent'>
      <div className='hairstyleComponentImgBox'>
        <img className='hairstyleImg' src={imageUrl} alt="헤어스타일 이미지" />
      </div>
      <div className='hairstyleComponentIconList'>
        <img className='icon' src="/download.png" alt="다운로드" onClick={handleDownload} />
        <img className='icon' src="/delete.png" alt="삭제" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default HairstyleComponent;
