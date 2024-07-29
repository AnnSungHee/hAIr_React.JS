import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/pages/AiHairstylePageStyle.css';
import HeaderComponent from '../components/HeaderComponent';
import ImageBoxComponent from '../components/ImageBoxComponent';

const AiHairstylePage = () => {
  const [images, setImages] = useState({ face: null, hair: null });
  const resultCanvasRef = useRef(null);
  const loadingTxtRef = useRef(null);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(36);
  const [activeBlocks, setActiveBlocks] = useState(0);
  const [activeDiamond, setActiveDiamond] = useState(0);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [isDownloadable, setIsDownloadable] = useState(false);

  useEffect(() => {
    if (location.state && location.state.imageSrc && location.state.faceImageUrl) {
      const base64StringHair = location.state.imageSrc.split(',')[1];
      const binaryStringHair = window.atob(base64StringHair);
      const lenHair = binaryStringHair.length;
      const bytesHair = new Uint8Array(lenHair);
      for (let i = 0; i < lenHair; i++) {
        bytesHair[i] = binaryStringHair.charCodeAt(i);
      }
      const blobHair = new Blob([bytesHair], { type: 'image/png' });
      const fileHair = new File([blobHair], "hair.png", { type: "image/png" });

      const base64StringFace = location.state.faceImageUrl.split(',')[1];
      const binaryStringFace = window.atob(base64StringFace);
      const lenFace = binaryStringFace.length;
      const bytesFace = new Uint8Array(lenFace);
      for (let i = 0; i < lenFace; i++) {
        bytesFace[i] = binaryStringFace.charCodeAt(i);
      }
      const blobFace = new Blob([bytesFace], { type: 'image/png' });
      const fileFace = new File([blobFace], "face.png", { type: "image/png" });

      setImages({ face: fileFace, hair: fileHair });
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
    setIsDownloadable(false);

    if (loadingTxtRef.current) {
      loadingTxtRef.current.style.display = 'block';
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
        setLoadingPercentage(100);
        setIsDownloadable(true);
        clearInterval(countdown);

        if (loadingTxtRef.current) {
          loadingTxtRef.current.style.display = 'none';
        }

        const url = URL.createObjectURL(response.data);
        setResultImageUrl(url);
      };
      img.src = URL.createObjectURL(response.data);
    } catch (error) {
      console.error("AI 적용 실패:", error);
      alert(`AI 적용 실패: ${error.message}`);
      setLoading(false);
      setLoadingPercentage(0);
      setIsDownloadable(false);
      clearInterval(countdown);

      if (loadingTxtRef.current) {
        loadingTxtRef.current.style.display = 'none';
      }
    }
  };

  const handleStartClick = () => {
    applyAI(images);
  };

  const handleDownloadClick = () => {
    if (isDownloadable && resultCanvasRef.current) {
      const link = document.createElement('a');
      link.href = resultCanvasRef.current.toDataURL('image/png');
      link.download = 'result.png';
      link.click();
    } else {
      alert("다운로드할 이미지가 없습니다.");
    }
  };

  return (
    <>
      <HeaderComponent />
      <div className='simulation'>
        <div className='inputOutputBox'>
          <span className='diamondImgContainer'>
            <div className='imgBoxContainer'>
              <ImageBoxComponent label="얼굴" onImageUpload={(file) => handleImageUpload('face', file)} imageUrl={images.face ? URL.createObjectURL(images.face) : null} />
              <ImageBoxComponent label="헤어" onImageUpload={(file) => handleImageUpload('hair', file)} imageUrl={images.hair ? URL.createObjectURL(images.hair) : null} />
            </div>

            <div className='diamonds' style={{ display: 'none' }}>
              {[...Array(4)].map((_, index) => (
                <div key={index} className={index === activeDiamond ? 'glitteringDaimond' : ''}></div>
              ))}
            </div>
            <div className='startBtn' onClick={handleStartClick}>Start</div>
          </span>

          <div className='resultImgBox'>
            <canvas ref={resultCanvasRef} width={500} height={500} style={{ display: 'none' }}></canvas>
            <img 
              src="/download.png" 
              alt="다운로드 아이콘" 
              onClick={handleDownloadClick} 
              style={{ cursor: isDownloadable ? 'pointer' : 'not-allowed', opacity: isDownloadable ? 1 : 0.5 }} 
            />
            <div className='loadingStat'>{loadingPercentage.toFixed(0)}/<span>100</span></div>
            <div className='loadingTxt' ref={loadingTxtRef} style={{ display: 'none' }}>Loading..</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiHairstylePage;
