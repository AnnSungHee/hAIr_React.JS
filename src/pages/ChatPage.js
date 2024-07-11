import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import '../assets/styles/pages/ChatPageStyle.css';
import BotChatComponent from '../components/BotChatComponent';
import UserChatComponent from '../components/UserChatComponent';

const ChatPage = () => {

    return (
        <>
            <HeaderComponent/>
            <div className='chatBox'>
                <div className='chatList'>
                    
                    <BotChatComponent/>
                    
                    <UserChatComponent/>
            
                </div>
                <div className='inputBox'>
                    <textarea className='textArea' placeholder='메세지를 입력해주세요.'/>
                    <div className='btnArea'><img src="/images/pages/ChatPage/enter.svg" alt="" /></div>
                </div>
            </div>
        </>
    );
};

export default ChatPage;
