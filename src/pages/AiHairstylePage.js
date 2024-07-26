import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/pages/AiHairstylePageStyle.css';
import HeaderComponent from '../components/HeaderComponent';
import ImageBoxComponent from '../components/ImageBoxComponent';

const AiHairstylePage = () => {
  const [images, setImages] = useState({ face: null, hair: null });
  const resultCanvasRef = useRef(null);
  const loadingTxtRef = useRef(null); // loadingTxt를 참조하는 ref 추가
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(36);
  const [activeBlocks, setActiveBlocks] = useState(0);
  const [activeDiamond, setActiveDiamond] = useState(0); // 추가된 상태 변수
  const [loadingPercentage, setLoadingPercentage] = useState(0); // 로딩 퍼센티지 추가

  useEffect(() => {
    if (location.state && location.state.imageSrc) {
      fetch(location.state.imageSrc)
        .then(response => response.blob())
        .then(blob => {
          const file = new File([blob], "hair.jpg", { type: blob.type });
          setImages(prevImages => ({ ...prevImages, hair: file }));
        })
        .catch(error => console.error('Error fetching image:', error));
    }
  }, [location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDiamond((prev) => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (images.face && images.hair) {
      applyAI(images);
    }
  }, [images]);

  const handleImageUpload = (type, file) => {
    setImages((prevImages) => ({ ...prevImages, [type]: file }));
  };

  const applyAI = async (images) => {
    if (!images.face || !images.hair) {
      alert("두 개의 이미지를 모두 업로드해주세요.");
      return;
    }

    setLoading(true);
    setTimeLeft(36);
    setActiveBlocks(0);
    setLoadingPercentage(0);

    if (loadingTxtRef.current) {
      loadingTxtRef.current.style.display = 'block'; // 로딩 시작 시 loadingTxt 표시
    }

    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        setLoadingPercentage(((36 - newTime) / 36) * 100);
        if (newTime <= 0) {
          clearInterval(countdown);
          return 0;
        }
        setActiveBlocks(prevBlocks => prevBlocks + 1);
        return newTime;
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

        resultCanvasRef.current.style.display = 'block';
        setLoading(false);
        setLoadingPercentage(100); // 로딩 완료 시 100%로 설정
        clearInterval(countdown); // 성공 시 countdown 클리어

        if (loadingTxtRef.current) {
          loadingTxtRef.current.style.display = 'none'; // 로딩 완료 시 loadingTxt 숨김
        }
      };
      img.src = URL.createObjectURL(response.data);
    } catch (error) {
      console.error("AI 적용 실패:", error);
      alert(`AI 적용 실패: ${error.message}`);
      setLoading(false);
      setLoadingPercentage(0); // 실패 시 0으로 초기화
      clearInterval(countdown); // 실패 시 countdown 클리어

      if (loadingTxtRef.current) {
        loadingTxtRef.current.style.display = 'none'; // 실패 시 loadingTxt 숨김
      }
    }
  };

  return (
    <>
      <HeaderComponent />

      <div className='inputOutputBox'>
        <span className='diamondImgContainer'>
          <div className='imgBoxContainer'>
            <ImageBoxComponent label="얼굴" onImageUpload={(file) => handleImageUpload('face', file)} />
            <ImageBoxComponent label="헤어" onImageUpload={(file) => handleImageUpload('hair', file)} imageUrl={images.hair ? URL.createObjectURL(images.hair) : null} />
          </div>

          <div className='diamonds'>
            {[...Array(4)].map((_, index) => (
              <div key={index} className={index === activeDiamond ? 'glitteringDaimond' : ''}></div>
            ))}
          </div>
        </span>

        <div className='resultImgBox'>
          <canvas ref={resultCanvasRef} width={500} height={500} style={{ display: 'none' }}></canvas>
          <img src="/download.png" alt="" />
          <div className='loadingStat'>{loadingPercentage.toFixed(0)}/<span>100</span></div>
          <div className='loadingTxt' ref={loadingTxtRef} style={{ display: 'none' }}>Loading..</div>
        </div>
      </div>
    </>
  );
};

export default AiHairstylePage;
