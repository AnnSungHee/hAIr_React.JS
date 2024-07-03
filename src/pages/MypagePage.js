import React from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import '../assets/styles/pages/MypagePage.css';

const MypagePage = () => {
  return (
    <div>
      <HeaderComponent />

      <div className='pageMain'>
        <Link to="/mypage-edit">
          <div className='profileBox'>
            <div className='profileImgBox'>
              <img className='profileImg' src="/images/pages/MypagePage/profile.png" alt="profile image" />
              <img className='editImg' src="/images/pages/MypagePage/edit.png" alt="edit image" />
            </div>
            <div className='userName'>Mr.Jeon</div>
            <div className='location'>
              <img src="/images/pages/MypagePage/location.svg" alt="" /> 
              경기도 안양시 동안구
            </div>
          </div>
        </Link>

        <div className='row-list'>
          <div className='row'>
            <div className='label'>이메일 주소*</div>
            <div>jeonpower@naver.com</div>
          </div>

          <div className='row'>
            <div className='label'>비밀번호*</div>
            <div>●●●●●●●●●●●●</div>
          </div>

          <div className='row'>
            <div className='label'>성별</div>
            <span className='gender'>
              <div>
                <label>남성</label>
                <input type="radio" checked disabled/>
              </div>
              <div>
                <label>여성</label>
                <input type="radio" disabled/>
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
