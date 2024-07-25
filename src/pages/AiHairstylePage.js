import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/pages/AiHairstylePageStyle.css';
import HeaderComponent from '../components/HeaderComponent';
import ImageBoxComponent from '../components/ImageBoxComponent';

const AiHairstylePage = () => {
  const [images, setImages] = useState({ face: null, hair: null });
  const resultCanvasRef = useRef(null);
  const loadingImgRef = useRef(null);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(36);
  const [activeBlocks, setActiveBlocks] = useState(0);

  useEffect(() => {
    if (location.state && location.state.imageSrc) {
      setImages(prevImages => ({ ...prevImages, hair: location.state.imageSrc }));
    }
  }, [location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageUpload = (type, file) => {
    setImages((prevImages) => ({ ...prevImages, [type]: file }));
  };

  const applyAI = async () => {
    if (!images.face || !images.hair) {
      alert("두 개의 이미지를 모두 업로드해주세요.");
      return;
    }

    setLoading(true);
    setTimeLeft(36);
    setActiveBlocks(0);

    if (loadingImgRef.current) {
      loadingImgRef.current.style.display = 'inline-block';
    }

    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          return 0;
        }
        setActiveBlocks(prevBlocks => prevBlocks + 1);
        return prevTime - 1;
      });
    }, 1000);

    const formData = new FormData();
    formData.append('face', images.face);
    formData.append('hair', images.hair);

    try {
      const response = await axios.post('http://localhost:8080/simulation', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const img = new Image();
      img.onload = () => {
        const ctx = resultCanvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, resultCanvasRef.current.width, resultCanvasRef.current.height);
        ctx.drawImage(img, 0, 0, resultCanvasRef.current.width, resultCanvasRef.current.height);

        if (loadingImgRef.current) {
          loadingImgRef.current.style.display = 'none';
        }
        resultCanvasRef.current.style.display = 'block';
        setLoading(false);
      };
      img.src = URL.createObjectURL(response.data);
    } catch (error) {
      console.error("AI 적용 실패:", error);
      alert(`AI 적용 실패: ${error.message}`);
      if (loadingImgRef.current) {
        loadingImgRef.current.style.display = 'none';
      }
      setLoading(false);
    }
  };

  const calculatePercentage = () => {
    return ((36 - timeLeft) / 36) * 100;
  };

  const renderLoadingBlocks = () => {
    const blocks = [];
    for (let i = 0; i < 36; i++) {
      blocks.push(
        <div
          key={i}
          className={`loading-block ${i < activeBlocks ? 'active' : ''}`}
        ></div>
      );
    }
    return blocks;
  };

  return (
    <>
      <HeaderComponent />

      <div className='inputOutputBox'>
        <div className='imgBoxContainer'>
          <ImageBoxComponent label="얼굴" onImageUpload={(file) => handleImageUpload('face', file)} />
          <ImageBoxComponent label="헤어" onImageUpload={(file) => handleImageUpload('hair', file)} imageUrl={images.hair} />
        </div>

        <div className='applyBtn' onClick={applyAI}>AI 적용해보기</div>
        
        <div className='resultImgBox'>
          <img ref={loadingImgRef} src="/loading.gif" alt="loading" style={{ display: 'none' }} />
          <canvas ref={resultCanvasRef} width={550} height={550} style={{ display: 'none' }}></canvas>
          {loading && (
            <div className="loading-bar-container">
              <div className="loading-bar">
                {renderLoadingBlocks()}
              </div>
              <div className="loading-text">{calculatePercentage().toFixed(2)}%</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AiHairstylePage;
