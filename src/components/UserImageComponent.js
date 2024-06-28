import React, { useEffect, useRef } from 'react';
import '../assets/styles/components/UserImageComponentStyle.css';

const UserImageComponent = ({ capturedImage, canvasRef }) => {
  useEffect(() => {
    if (capturedImage) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const image = new Image();
      image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
      image.src = capturedImage;
    }
  }, [capturedImage, canvasRef]);

  return (
    <div className='canvasBox'>
      <canvas ref={canvasRef} id="preview" width="640" height="480"></canvas>
    </div>
  );
};

export default UserImageComponent;
