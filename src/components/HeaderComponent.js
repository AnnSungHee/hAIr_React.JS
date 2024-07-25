import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/components/HeaderComponentStyle.css';
import axios from 'axios';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = async () => {
        await axios.post('http://localhost:8080/member/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('nickName');

        alert('로그아웃이 성공적으로 완료되었습니다.');
        navigate('/');  // 로그아웃 후 홈 페이지로 리디렉션 
    };

    return (
        <nav id='header'>
            <h1>헤더</h1>
            <span className='headerContent'>
                <div>
                    <Link to="/">
                        <img className='logo' src="/logo.png" alt="회사 로고" />
                    </Link>
                </div>
                <ul className='linkList'>
                    <li><Link to="/chatpage">ChatBot</Link></li>
                    <li><Link to="/ai-hairstyle">AI Simulation</Link></li>
                    <li><Link to="/mypage">Mypage</Link></li>
                    {token ? (
                        <li><div onClick={handleLogout} style={{ cursor: 'pointer' }}>Log out</div></li>
                    ) : (
                        <li><Link to="/sign-in">Log in</Link></li>
                    )}
                </ul>
            </span>
        </nav>
    );
};

export default HeaderComponent;
