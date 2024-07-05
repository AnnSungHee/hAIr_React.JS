import React, { useState, useRef } from 'react';
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent';
import '../assets/styles/pages/SignInPageStyle.css';
import { Link } from 'react-router-dom';

const SignInPage = () => {

    return (
        <>
            <HeaderComponent/>
            <div className='main'>
                <div className='textInput'>
                    <label>이메일 주소</label>
                    <input type="text" name='email' />
                </div>
                <div className='textInput'>
                    <label>비밀번호</label>
                    <input type="password" name='password' />
                </div>
                
                
                <div className='signInBtn'>로그인</div>
                <div className='linkList'>
                    <Link to="/join"><div>회원가입</div></Link>
                    <div>ㅣ</div>
                    <Link to=""><div>이메일 찾기</div></Link>
                    <div>ㅣ</div>
                    <Link to=""><div>비밀번호 찾기</div></Link>
                </div>
            </div>
        </>
    );
};

export default SignInPage;
