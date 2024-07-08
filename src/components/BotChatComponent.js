import React from 'react';
import '../assets/styles/components/BotChatComponentStyle.css';
import ImgListComponent from './ImgListComponent';

const BotChatComponent = () => {

  return (
    <div className='botChatBox'>
        <div>
            <div className='botInfo'>
                <div className='botImg'><img src="/images/pages/ChatPage/profile.svg" alt="" /></div>
                <div className='botName'>chat bot</div>
            </div>
        </div>
        <p className='bot'>어떤 머리 스타일 원하시나요?</p>
        {/* <p className='bot'>어떤 머리 스타일 원하시나요?</p>
        <p className='bot'>어떤 머리 스타일 원하시나요?</p> */}
        <ImgListComponent/>

    </div>
  );
};

export default BotChatComponent;
