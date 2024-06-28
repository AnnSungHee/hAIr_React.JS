import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/HeaderComponentStyle.css';

const HeaderComponent = () => {

  return (
    <nav>
        <h1>헤더</h1>
        <span className='headerContent'>
            <div>
                <Link to="/">
                    <img className='companyLogo' src="/logo.png" alt="회사 로고" />
                </Link>
            </div>
            <ul>
                <li><Link to="/ai-hairstyle">AI 헤어스타일</Link></li>
                <li><Link to="/mypage">마이페이지</Link></li>
                <li><Link to="/logout">로그아웃</Link></li>
            </ul>
        </span>
    </nav>
  );
};

export default HeaderComponent;
