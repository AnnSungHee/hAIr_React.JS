import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../assets/styles/pages/AiHairstylePageStyle.css';
import HeaderComponent from '../components/HeaderComponent';
import ImageBoxComponent from '../components/ImageBoxComponent';

const AiHairstylePage = () => {
  const [images, setImages] = useState({ face: null, hair: null });
  const resultCanvasRef = useRef(null);
  const loadingImgRef = useRef(null);

  const handleImageUpload = (type, file) => {
    setImages((prevImages) => ({ ...prevImages, [type]: file }));
  };

  const applyAI = async () => {
    if (!images.face || !images.hair) {
      alert("두 개의 이미지를 모두 업로드해주세요.");
      return;
    }

    // 로딩 이미지를 보이게 설정
    if (loadingImgRef.current) {
      loadingImgRef.current.style.display = 'inline-block';
    }

    // ====================================파이썬 서버 요청용================================
    const formData = new FormData();
    formData.append('face', images.face);
    formData.append('shape', images.hair);
    formData.append('color', images.hair);
    // =======================================================================================

    // ==============================spring boot 서버 요청용====================================
    // formData.append('face', images.face);
    // formData.append('hair', images.hair);
    // =======================================================================================

    try {
      // ====================================파이썬 서버 요청용================================
      const response = await axios.post('http://localhost:8000/hair_transfer', formData, {
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

        // 로딩 이미지를 숨기고 캔버스를 보이게 설정
        if (loadingImgRef.current) {
          loadingImgRef.current.style.display = 'none';
        }
        resultCanvasRef.current.style.display = 'block';
      };
      img.src = URL.createObjectURL(response.data);
      // =======================================================================================

      // ==============================spring boot 서버 요청용====================================
      // const response = await axios.post('http://localhost:8080/simulation', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   responseType: 'blob',
      // });

      // const img = new Image();
      // img.onload = () => {
      //   const ctx = resultCanvasRef.current.getContext('2d');
      //   ctx.clearRect(0, 0, resultCanvasRef.current.width, resultCanvasRef.current.height);
      //   ctx.drawImage(img, 0, 0, resultCanvasRef.current.width, resultCanvasRef.current.height);

      //   // 로딩 이미지를 숨기고 캔버스를 보이게 설정
      //   if (loadingImgRef.current) {
      //     loadingImgRef.current.style.display = 'none';
      //   }
      //   resultCanvasRef.current.style.display = 'block';
      // };
      // img.src = URL.createObjectURL(response.data);
      // =======================================================================================


    } catch (error) {
      console.error("AI 적용 실패:", error);
      alert(`AI 적용 실패: ${error.message}`);
      // 에러 발생 시 로딩 이미지를 숨김
      if (loadingImgRef.current) {
        loadingImgRef.current.style.display = 'none';
      }
    }
  };

  return (
    <>
      <HeaderComponent />

      <div className='inputOutputBox'>
        <div className='imgBoxContainer'>
          <ImageBoxComponent label="얼굴" onImageUpload={(file) => handleImageUpload('face', file)} />
          <ImageBoxComponent label="헤어" onImageUpload={(file) => handleImageUpload('hair', file)} />
        </div>

        <div className='applyBtn' onClick={applyAI}>AI 적용해보기</div>
        
        <div className='resultImgBox'>
          <img ref={loadingImgRef} src="/loading.gif" alt="loading" style={{ display: 'none' }} />
          <canvas ref={resultCanvasRef} width={550} height={550} style={{ display: 'none' }}></canvas>
        </div>
      </div>
    </>
  );
};

export default AiHairstylePage;
