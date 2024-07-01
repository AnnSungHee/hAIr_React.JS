import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/styles/pages/AiHairstylePageStyle.css';
import HeaderComponent from '../components/HeaderComponent';
import UserImageComponent from '../components/UserImageComponent';
import WebCamModalComponent from '../components/WebCamModalComponent';
import HairstyleListComponent from '../components/HairstyleListComponent';



const AiHairstylePage = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hairstyleData, setHairstyleData] = useState([]);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleCapture = (image) => {
    setCapturedImage(image);
    setIsModalVisible(false); // Hide the modal after capturing the image
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyAI = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      try {
        const response = await axios.post('/api/apply-ai', { image: dataURL });
        setHairstyleData(response.data);
      } catch (error) {
        console.error('Error applying AI:', error);
      }
    }
  };

  return (
    <>
      <HeaderComponent />

      <div className='userImgBox'>
        <span>
          <button onClick={() => fileInputRef.current.click()}><img src="/images/pages/AiHairstylePage/folder.svg" alt="" /></button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <button onClick={() => setIsModalVisible(true)}><img src="/images/pages/AiHairstylePage/camera.svg" alt="" /></button>
        </span>

        <UserImageComponent capturedImage={capturedImage} canvasRef={canvasRef} />
        <button onClick={handleApplyAI}>AI 적용해보기</button>
      </div>

      <HairstyleListComponent hairstyleData={hairstyleData} />

      {isModalVisible && <WebCamModalComponent onCapture={handleCapture} />}
    </>
  );
};

export default AiHairstylePage;
