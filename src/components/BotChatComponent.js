import React from 'react';
import '../assets/styles/components/BotChatComponentStyle.css';

const BotChatComponent = ({ text }) => {


  return (
    <div className='botChatBox'>
      <div className='botImg'><img src="/chatbot.png" alt="bot profile" /></div>
      <p className='bot'>{text}</p>
    </div>
  );
};

export default BotChatComponent;
