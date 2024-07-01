import React from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import HairstyleComponent from '../components/HairstyleComponent';
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

        <div className='hairstyleList'>
          <Link><HairstyleComponent/></Link>
          <Link><HairstyleComponent/></Link>
          <Link><HairstyleComponent/></Link>
          <Link><HairstyleComponent/></Link>
        </div>

        <div className='deleteAccountBtn'>회원탈퇴</div>

      </div>
    </div>
  );
};

export default MypagePage;
