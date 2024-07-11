import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import '../assets/styles/pages/MypagePage.css';
import axios from 'axios';

const MypagePage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    profileImage: '',
    email: '',
    nickname: '',
    address: '',
    gender: ''
  });

  useEffect(() => {
    const userId = localStorage.getItem("id");

    // 만약 로그인을 하지 않았다면 로그인 페이지로 리디렉션
    if(!userId){
      navigate("/sign-in");
      alert("로그인을 해주세요");
      return;
    } 

    // 로그인을 했다면 회원정보 얻어와서 화면에 적용하기
    axios.get(`http://localhost:8080/member/${userId}`)
      .then(response => {
        // 필요한 데이터만 추출하여 상태 업데이트(response.data에 password도 포함되어있기 때문)
        const { profileImage, email, nickname, address, gender } = response.data;
        setUserData({ profileImage, email, nickname, address, gender });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [navigate]); // navigate를 의존성 배열에 추가

  return (
    <div>
      <HeaderComponent />

      <div className='pageMain'>
        <Link to="/mypage-edit">
          <div className='profileBox'>
            <div className='profileImgBox'>
              <img className='profileImg' src={userData.profileImage || "/images/pages/MypagePage/profile.png"} alt="profile" />
              <img className='editImg' src="/images/pages/MypagePage/edit.png" alt="edit" />
            </div>
            <div className='userName'>{userData.nickname || 'User'}</div>
            <div className='location'>
              <img src="/images/pages/MypagePage/location.svg" alt="location" />
              {userData.address || '주소 정보 없음'}
            </div>
          </div>
        </Link>

        <div className='row-list'>
          <div className='row'>
            <div className='label'>이메일 주소</div>
            <div>{userData.email || '이메일 정보 없음'}</div>
          </div>

          <div className='row'>
            <div className='label'>성별</div>
            <span className='gender'>
              <div>
                <label>남성</label>
                <input type="radio" checked={userData.gender === '남성'} disabled />
              </div>
              <div>
                <label>여성</label>
                <input type="radio" checked={userData.gender === '여성'} disabled />
              </div>
            </span>
          </div>
        </div>

        <div className='deleteAccountBtn'>회원탈퇴</div>
      </div>
    </div>
  );
};

export default MypagePage;
