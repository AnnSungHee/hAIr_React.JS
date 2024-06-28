import React, { useRef, useEffect } from 'react';
import '../assets/styles/components/WebCamModalComponentStyle.css';

const WebCamModalComponent = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error('Error accessing the webcam: ', err));
  }, []);

  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataURL = canvasRef.current.toDataURL('image/png');
    onCapture(dataURL); // Capture and hide the modal
  };

  return (
    <div className='webcamModalContainer'>
      <div className='webcamModalContent'>
        <video ref={videoRef} autoPlay playsInline width="640" height="480"></video>
        <button onClick={captureImage}>찰칵✨</button>
        <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
      </div>
    </div>
  );
};

export default WebCamModalComponent;
