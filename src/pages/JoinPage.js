import React, { useState, useRef } from 'react';
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent';
import '../assets/styles/pages/JoinPageStyle.css';

const JoinPage = () => {

    return (
        <>
            <HeaderComponent/>
            <div className='main'>
                <div className='joinText'>회원가입</div>
                <div className='textInput'>
                    <label>이메일 주소*</label>
                    <input type="text" name='email' />
                </div>
                <div className='textInput'>
                    <label>비밀번호*</label>
                    <input type="password" name='password' />
                </div>
                <div className='textInput'>
                    <label>닉네임*</label>
                    <input type="text" name='username' />
                </div>
                <div className='textInput'>
                    <label>주소</label>
                    <input type="text" name='location' />
                </div>
                <div className='radioInput'>
                    <label>성별*</label>
                    <div>
                        <div>
                            <label>남성</label>
                            <input type="radio" name='gender' value="male" />
                        </div>
                        <div>
                            <label>여성</label>
                            <input type="radio" name='gender' value="female" />
                        </div>
                    </div>
                </div>
                
                <div className='submitBtn'>가입하기</div>
            </div>
        </>
    );
};

export default JoinPage;
