import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import '../assets/styles/pages/ChatPageStyle.css';
import BotChatComponent from '../components/BotChatComponent';
import UserChatComponent from '../components/UserChatComponent';
import axios from 'axios';

const ChatPage = () => {
    const [userImage, setUserImage] = useState(null);
    const [chatHistory, setChatHistory] = useState([
        { type: 'bot', text: 'hAIr 상담소에 오신 것을 환영합니다. 헤어스타일 상담을 위해 고객님의 사진을 올려주세요.' }
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false); // 요청 상태를 추적하기 위한 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 추적하기 위한 상태
    const navigate = useNavigate();
    const textAreaRef = useRef(null); // textarea에 대한 ref

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setUserImage(file);

        const formData = new FormData();
        formData.append('image', file);

        // 이미지 업로드 메시지를 먼저 추가
        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { type: 'user', image: file }
        ]);

        setIsSubmitting(true); // 서버에 요청을 보내기 전에 입력을 막음
        setIsLoading(true); // 로딩 상태 시작

        try {
            const response = await axios.post('http://localhost:8080/chat/face-analysis', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // 서버 응답이 성공적으로 도착했을 때 봇 메시지를 추가
            setChatHistory(prevChatHistory => [
                ...prevChatHistory,
                { type: 'bot', text: '고객님의 얼굴을 분석완료하였습니다. 원하시는 헤어스타일이 있나요?' }
            ]);
        } catch (error) {
            console.error('Error uploading image:', error);

            // 서버 응답이 실패했을 때의 메시지를 추가할 수도 있습니다.
            setChatHistory(prevChatHistory => [
                ...prevChatHistory,
                { type: 'bot', text: '사진 업로드에 실패했습니다. 다시 시도해주세요.' }
            ]);
        } finally {
            setIsSubmitting(false); // 서버 응답을 받으면 입력을 다시 허용
            setIsLoading(false); // 로딩 상태 종료
        }
    };

    const handleSendMessage = async (message) => {
        setChatHistory(prevChatHistory => [
            ...prevChatHistory, 
            { type: 'user', text: message }
        ]);

        setIsSubmitting(true); // 서버에 요청을 보내기 전에 입력을 막음
        setIsLoading(true); // 로딩 상태 시작

        try {
            const response = await axios.post('http://localhost:8080/chat/hairstyle-recommendations', { message });

            const recommendedStyles = response.data; // 추천 헤어스타일 데이터
            setChatHistory(prevChatHistory => [
                ...prevChatHistory, 
                { type: 'bot', text: recommendedStyles.response, images: recommendedStyles.images }
            ]);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setIsSubmitting(false); // 서버 응답을 받으면 입력을 다시 허용
            setIsLoading(false); // 로딩 상태 종료
            textAreaRef.current.value = ''; // textarea 비우기
        }
    };

    const handleImageClick = (imageSrc) => {
        navigate('/ai-hairstyle', { state: { imageSrc } });
    };

    return (
        <>
            <HeaderComponent />
            <div className='chatBox'>
                <div className='chatList'>
                    {chatHistory.map((chat, index) => (
                        chat.type === 'bot' ? 
                        <BotChatComponent key={index} text={chat.text} images={chat.images} onImageClick={handleImageClick} /> : 
                        <UserChatComponent key={index} text={chat.text} image={chat.image} />
                    ))}
                    {isLoading && (
                        <div className="loading-indicator">
                            <img src="/spinner.gif" alt="Loading..." />
                        </div>
                    )}
                </div>
                <div className='inputBox'>
                    <textarea 
                        className='textArea' 
                        placeholder='메세지를 입력해주세요.' 
                        disabled={isSubmitting} 
                        ref={textAreaRef} // ref를 textarea에 연결
                    />
                    <div className='btnArea'>
                        <img src="/images/pages/ChatPage/enter.svg" alt="send message" 
                            onClick={() => {
                                if (!isSubmitting) handleSendMessage(textAreaRef.current.value);
                            }} 
                            style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }} 
                        />
                    </div>
                    <label htmlFor="file-upload" className="fileUploadLabel">
                        사진 업로드
                    </label>
                    <input id="file-upload" type="file" onChange={handleImageUpload} disabled={isSubmitting} style={{ display: 'none' }} />
                </div>
            </div>
        </>
    );
};

export default ChatPage;
