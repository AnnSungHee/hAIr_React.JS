import React from 'react';
import '../assets/styles/components/UserChatComponentStyle.css';

const UserChatComponent = ({ text, image }) => {
  return (
    <div className='userChatBox'>
        {text && <p className='user'>{text}</p>}
        {image && <img src={URL.createObjectURL(image)} alt="uploaded" className="chatImage" />}
    </div>
  );
};

export default UserChatComponent;
