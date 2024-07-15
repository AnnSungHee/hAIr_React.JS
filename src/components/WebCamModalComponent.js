import React, { useRef, useEffect } from 'react';
import '../assets/styles/components/WebCamModalComponentStyle.css';

const WebCamModalComponent = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    getUserMedia();

    return () => {
      if (videoElement && videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageData = canvasRef.current.toDataURL('image/png');
    onCapture(imageData);
    onClose();
  };

  return (
    <div className='webcamModalContainer'>
      <div className='webcamModalContent'>
        <video ref={videoRef} width="640" height="480" autoPlay></video>
        <button onClick={handleCapture}>찰칵✨</button>
        <button onClick={onClose}>닫기</button>
        <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
      </div>
    </div>
  );
};

export default WebCamModalComponent;
