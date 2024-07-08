import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/components/HeaderComponentStyle.css';

const HeaderComponent = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('nickName');
        alert('로그아웃이 성공적으로 완료되었습니다.');
        navigate('/');  // 로그아웃 후 홈 페이지로 리디렉션
    };

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
                    <li><Link to="/sign-in">로그인</Link></li>
                    <li><div onClick={handleLogout} style={{ cursor: 'pointer' }}>로그아웃</div></li>
                </ul>
            </span>
        </nav>
    );
};

export default HeaderComponent;
