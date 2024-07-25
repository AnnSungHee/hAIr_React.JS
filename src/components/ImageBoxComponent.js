import React, { useRef, useState, useEffect } from 'react';
import '../assets/styles/components/ImageBoxComponentStyle.css';
import WebCamModalComponent from '../components/WebCamModalComponent';

const ImageBoxComponent = ({ label, onImageUpload, imageUrl }) => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.onload = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
      onImageUpload(file); // 파일 객체를 직접 전달
    }
  };

  const handleWebcamCapture = (imageData) => {
    const img = new Image();
    img.onload = () => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      // Base64 데이터를 Blob으로 변환하여 파일 객체로 전달
      const blob = dataURLToBlob(imageData);
      const file = new File([blob], "webcam-image.png", { type: "image/png" });
      onImageUpload(file);
    };
    img.src = imageData;
  };

  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  return (
    <>
      <div className='canvasBox'>
        <div>{label}</div>
        <canvas ref={canvasRef} width="300" height="300"></canvas>
        <span className='btnBox'>
          <button onClick={() => setShowWebcam(true)}>
            <img src="/camera.png" alt="" />
          </button>

          <button onClick={() => fileInputRef.current.click()}>
            <img src="/folder.png" alt="" />
          </button>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileInput}
          />
        </span>
      </div>
      {showWebcam && <WebCamModalComponent onCapture={handleWebcamCapture} onClose={() => setShowWebcam(false)} />}
    </>
  );
};

export default ImageBoxComponent;
