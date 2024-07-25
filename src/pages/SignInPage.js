import React, { useState } from 'react';
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent';
import '../assets/styles/pages/SignInPageStyle.css';
import { Link, useNavigate } from 'react-router-dom';

const SignInPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/member/sign-in', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("id", response.data.id)
                localStorage.setItem("nickName", response.data.nickName)
                alert('로그인이 성공적으로 완료되었습니다.');
                navigate('/');  
            } else {
                setLoginError('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
            }
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
            setLoginError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <>
            <HeaderComponent />
            
            <section id='loginBox'>
                <span className='emailNPasswordInputBox'>
                    <div className='emailInput'>
                        <input
                            type="text"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                        />
                    </div>
                    <div className='passwordInput'>
                        <input
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                        />
                    </div>
                </span>
                <span className='signInBtnNjoinBtn'>
                    <div className='signInBtn' onClick={handleSubmit}>로그인</div>
                    {loginError && <div className='error'>{loginError}</div>}
                    <div className='joinBtn'><Link to="/join">회원가입</Link></div>
                </span>
            </section>
        </>
    );
};

export default SignInPage;
