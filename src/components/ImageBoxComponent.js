import React, { useRef, useState } from 'react';
import '../assets/styles/components/ImageBoxComponentStyle.css';
import WebCamModalComponent from '../components/WebCamModalComponent';

const ImageBoxComponent = ({ label, onImageUpload }) => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);

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
          onImageUpload(canvasRef.current.toDataURL('image/png'));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWebcamCapture = (imageData) => {
    const img = new Image();
    img.onload = () => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      onImageUpload(imageData);
    };
    img.src = imageData;
    setShowWebcam(false);
  };

  return (
    <>
      <div className='canvasBox'>
        <canvas ref={canvasRef} width="400" height="400"></canvas>
        <span className='btnBox'>
          <button onClick={() => fileInputRef.current.click()}>
            <img src="/images/components/ImageBoxComponent/folder.svg" alt="" />
          </button>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileInput}
          />
          <button onClick={() => setShowWebcam(true)}>
            <img src="/images/components/ImageBoxComponent/camera.svg" alt="" />
          </button>
        </span>
        <div>{label}</div>
      </div>
      {showWebcam && <WebCamModalComponent onCapture={handleWebcamCapture} onClose={() => setShowWebcam(false)} />}
    </>
  );
};

export default ImageBoxComponent;
