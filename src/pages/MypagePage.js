import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import HairstyleComponent from '../components/HairstyleComponent';
import '../assets/styles/pages/MypagePage.css';
import axios from 'axios';

const MypagePage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    nickname: '',
    address: '',
    gender: ''
  });

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      navigate("/sign-in");
      alert("로그인을 해주세요");
      return;
    }

    axios.get(`http://localhost:8080/member/${userId}`)
      .then(response => {
        const { member, imageUrls } = response.data;
        const { email, nickName, memberProfile, gender } = member;
        setUserData({ email, nickname: nickName, address: memberProfile.address.city, gender });
        setImageUrls(imageUrls.map(url => url.replace("file:///C:/Users/user/mainprj/hAIr_Spring_Boot/simulatedImg/", "http://localhost:8080/simulatedImg/")));
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [navigate]);

  const handleDelete = (urlToDelete) => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      navigate("/sign-in");
      alert("로그인을 해주세요");
      return;
    }

    // 이미지 URL을 상태에서 제거
    setImageUrls(prevUrls => prevUrls.filter(url => url !== urlToDelete));

    // 서버에 삭제 요청
    const imageName = urlToDelete.split('/').pop();
    console.log(imageName)
    axios.post(`http://localhost:8080/member/${userId}/${imageName}`)
      .then(response => {
        console.log('Image deleted:', response.data);
      })
      .catch(error => {
        console.error('Error deleting image:', error);
      });
  };

  return (
    <div>
      <HeaderComponent />
      <div className='pageMain'>
        <div className='profileBox'>
          <div className='userName'>
            {userData.nickname || 'User'}
            <Link to="/mypage-edit"><img className='profileEditIcon' src="/edit.png" alt="edit" /></Link>
          </div>
          <div className='location'>
            <img src="/images/pages/MypagePage/location.svg" alt="location" />
            {userData.address || '주소 정보 없음'}
          </div>
        </div>

        <div className='styleComponentList'>
          {imageUrls.map((url, index) => (
            <HairstyleComponent key={index} imageUrl={url} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MypagePage;
