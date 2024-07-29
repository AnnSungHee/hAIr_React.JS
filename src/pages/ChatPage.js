import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import '../assets/styles/pages/ChatPageStyle.css';
import BotChatComponent from '../components/BotChatComponent';
import UserChatComponent from '../components/UserChatComponent';
import axios from 'axios';

const ChatPage = () => {
    const [userImage, setUserImage] = useState(null);
    const [chatHistory, setChatHistory] = useState([
        { type: 'bot', text: 'hAIr 상담소에 오신 것을 환영합니다. 원하는 느낌을 말씀해주시면 그에 맞는 헤어스타일을 추천해드리겠습니다.' }
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const textAreaRef = useRef(null);
    const chatListRef = useRef(null);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory, isLoading]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setUserImage(file);

        const formData = new FormData();
        formData.append('image', file);

        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { type: 'user', image: file }
        ]);

        setIsSubmitting(true);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/chat/face-analysis', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setChatHistory(prevChatHistory => [
                ...prevChatHistory,
                { type: 'bot', text: '고객님의 얼굴을 분석완료하였습니다. 원하시는 헤어스타일이 있나요?' }
            ]);
        } catch (error) {
            console.error('Error uploading image:', error);

            setChatHistory(prevChatHistory => [
                ...prevChatHistory,
                { type: 'bot', text: '사진 업로드에 실패했습니다. 다시 시도해주세요.' }
            ]);
        } finally {
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (message) => {
        if (!message.trim()) return;

        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { type: 'user', text: message }
        ]);

        setIsSubmitting(true);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/chat/hairstyle-recommendations', { message });

            const text = response.data.response;
            const images = response.data.images;

            setChatHistory(prevChatHistory => [
                ...prevChatHistory,
                { type: 'bot', text: text, images: images }
            ]);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setIsSubmitting(false);
            setIsLoading(false);
            textAreaRef.current.value = '';
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage(textAreaRef.current.value);
        }
    };

    const handleImageClick = (imageSrc, imageFile) => {
        navigate('/ai-hairstyle', { state: { imageSrc, imageFile } });
    };

    return (
        <>
            <HeaderComponent />
            <div className='chatContainer'>
                <div className='chatBox'>
                    <div className='chatList' ref={chatListRef}>
                        {chatHistory.map((chat, index) => (
                            <div key={index} ref={index === chatHistory.length - 1 ? lastMessageRef : null}>
                                {chat.type === 'bot' ? 
                                    <BotChatComponent key={index} text={chat.text} images={chat.images} onImageClick={(imageSrc) => handleImageClick(imageSrc, chat.image)} /> : 
                                    <UserChatComponent key={index} text={chat.text} image={chat.image} />
                                }
                            </div>
                        ))}
                        {isLoading && (
                            <div className="loading-indicator">
                                <img src="/spinner.gif" alt="Loading..." />
                            </div>
                        )}
                    </div>
                    <div className='inputBox'>
                        <div className='inputWrapper'>
                            {/* <label htmlFor="file-upload" className="fileUploadLabel"><img src="/clip.png" alt="" /></label>
                            <input id="file-upload" type="file" onChange={handleImageUpload} disabled={isSubmitting} style={{ display: 'none' }} /> */}
                            
                            <textarea 
                                className='textArea' 
                                placeholder='메세지를 입력해주세요' 
                                disabled={isSubmitting} 
                                ref={textAreaRef}
                                onKeyDown={handleKeyDown}
                            />
                            
                            <div className='btnArea'>
                                <img src="/send.png" alt="send message" 
                                    onClick={() => {
                                        if (!isSubmitting) handleSendMessage(textAreaRef.current.value);
                                    }} 
                                    style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatPage;



// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import HeaderComponent from '../components/HeaderComponent';
// import '../assets/styles/pages/ChatPageStyle.css';
// import BotChatComponent from '../components/BotChatComponent';
// import UserChatComponent from '../components/UserChatComponent';
// import axios from 'axios';

// const ChatPage = () => {
//     const [userImage, setUserImage] = useState(null);
//     const [chatHistory, setChatHistory] = useState([
//         { type: 'bot', text: 'hAIr 상담소에 오신 것을 환영합니다. 헤어스타일 상담을 위해 고객님의 사진을 올려주세요.' }
//     ]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();
//     const textAreaRef = useRef(null);
//     const chatListRef = useRef(null);
//     const lastMessageRef = useRef(null);

//     useEffect(() => {
//         if (lastMessageRef.current) {
//             lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     }, [chatHistory, isLoading]);

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         setUserImage(file);

//         const formData = new FormData();
//         formData.append('image', file);

//         setChatHistory(prevChatHistory => [
//             ...prevChatHistory,
//             { type: 'user', image: file }
//         ]);

//         setIsSubmitting(true);
//         setIsLoading(true);

//         try {
//             const response = await axios.post('http://localhost:8080/chat/face-analysis', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             setChatHistory(prevChatHistory => [
//                 ...prevChatHistory,
//                 { type: 'bot', text: '고객님의 얼굴을 분석완료하였습니다. 원하시는 헤어스타일이 있나요?' }
//             ]);
//         } catch (error) {
//             console.error('Error uploading image:', error);

//             setChatHistory(prevChatHistory => [
//                 ...prevChatHistory,
//                 { type: 'bot', text: '사진 업로드에 실패했습니다. 다시 시도해주세요.' }
//             ]);
//         } finally {
//             setIsSubmitting(false);
//             setIsLoading(false);
//         }
//     };

//     const handleSendMessage = async (message) => {
//         setChatHistory(prevChatHistory => [
//             ...prevChatHistory,
//             { type: 'user', text: message }
//         ]);

//         setIsSubmitting(true);
//         setIsLoading(true);

//         try {
//             const response = await axios.post('http://localhost:8080/chat/hairstyle-recommendations', { message });

//             console.log(response);
//             console.log(response.data);

//             const text = response.data.response; // response.data.response에서 텍스트를 직접 가져오기
//             const images = response.data.images; // response.data.images에서 이미지를 가져오기

//             setChatHistory(prevChatHistory => [
//                 ...prevChatHistory,
//                 { type: 'bot', text: text, images: images } // 가져온 이미지들을 함께 넘기기
//             ]);
//         } catch (error) {
//             console.error('Error fetching recommendations:', error);
//         } finally {
//             setIsSubmitting(false);
//             setIsLoading(false);
//             textAreaRef.current.value = '';
//         }
//     };

//     const handleImageClick = (imageSrc, imageFile) => {
//         navigate('/ai-hairstyle', { state: { imageSrc, imageFile } });
//     };

//     return (
//         <>
//             <HeaderComponent />

//             <div className='chatBox'>
//                 <div className='chatList' ref={chatListRef}>
//                     {chatHistory.map((chat, index) => (
//                         <div key={index} ref={index === chatHistory.length - 1 ? lastMessageRef : null}>
//                             {chat.type === 'bot' ? 
//                                 <BotChatComponent key={index} text={chat.text} images={chat.images} onImageClick={(imageSrc) => handleImageClick(imageSrc, chat.image)} /> : 
//                                 <UserChatComponent key={index} text={chat.text} image={chat.image} />
//                             }
//                         </div>
//                     ))}
//                     {isLoading && (
//                         <div className="loading-indicator">
//                             <img src="/spinner.gif" alt="Loading..." />
//                         </div>
//                     )}
//                 </div>
//                 <div className='inputBox'>
//                     <label htmlFor="file-upload" className="fileUploadLabel"><img src="/clip.png" alt="" /></label>
//                     <input id="file-upload" type="file" onChange={handleImageUpload} disabled={isSubmitting} style={{ display: 'none' }} />
                    
//                     <textarea 
//                         className='textArea' 
//                         placeholder='메세지를 입력해주세요' 
//                         disabled={isSubmitting} 
//                         ref={textAreaRef}
//                     />
                    
//                     <div className='btnArea'>
//                         <img src="/send.png" alt="send message" 
//                             onClick={() => {
//                                 if (!isSubmitting) handleSendMessage(textAreaRef.current.value);
//                             }} 
//                             style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }} 
//                         />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ChatPage;
