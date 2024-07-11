import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../assets/styles/pages/AiHairstylePageStyle.css';
import HeaderComponent from '../components/HeaderComponent';
import ImageBoxComponent from '../components/ImageBoxComponent';

const AiHairstylePage = () => {
  const [images, setImages] = useState({ face: null, hair: null });
  const resultCanvasRef = useRef(null);

  const handleImageUpload = (type, imageData) => {
    setImages((prevImages) => ({ ...prevImages, [type]: imageData }));
  };

  const applyAI = async () => {
    if (!images.face || !images.hair) {
      alert("두 개의 이미지를 모두 업로드해주세요.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/simulation', images, {
        responseType: 'blob'
      });

      const img = new Image();
      img.onload = () => {
        const ctx = resultCanvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, resultCanvasRef.current.width, resultCanvasRef.current.height);
        ctx.drawImage(img, 0, 0, resultCanvasRef.current.width, resultCanvasRef.current.height);
      };
      img.src = URL.createObjectURL(response.data);
    } catch (error) {
      console.error("AI 적용 실패:", error);
    }
  };

  return (
    <>
      <HeaderComponent />

      <div className='inputOutputBox'>
        <div className='imgBoxContainer'>
          <ImageBoxComponent label="얼굴" onImageUpload={(imageData) => handleImageUpload('face', imageData)} />
          <ImageBoxComponent label="헤어" onImageUpload={(imageData) => handleImageUpload('hair', imageData)} />
        </div>

        <div className='applyBtn' onClick={applyAI}>AI 적용해보기</div>

        <div className='resultImgBox'>
          <canvas ref={resultCanvasRef} width={550} height={550}></canvas>
        </div>
      </div>
    </>
  );
};

export default AiHairstylePage;
