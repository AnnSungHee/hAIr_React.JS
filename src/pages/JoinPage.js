import React, { useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import '../assets/styles/pages/JoinPageStyle.css';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const JoinPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nickName: '',
        city: '',
        gender: ''
    });

    const [validationErrors, setValidationErrors] = useState({
        email: '',
        nickName: '',
        gender: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEmailBlur = async () => {
        try {
            const response = await API.post(`/member/check-email/${formData.email}`);
            if (!response.data) {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    email: '이 이메일은 이미 사용 중입니다.'
                }));
            } else {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    email: ''
                }));
            }
        } catch (error) {
            console.error('이메일 검증 중 오류 발생:', error);
        }
    };

    const handleNickNameBlur = async () => {
        try {
            const response = await API.post(`/member/check-nickName/${formData.nickName}`);
            if (!response.data) {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    nickName: '이 닉네임은 이미 사용 중입니다.'
                }));
            } else {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    nickName: ''
                }));
            }
        } catch (error) {
            console.error('닉네임 검증 중 오류 발생:', error);
        }
    };

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/sign-in');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 성별 검증 추가
        if (!formData.gender) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                gender: '성별을 선택해주세요.'
            }));
            return;
        } else {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                gender: ''
            }));
        }

        if (validationErrors.email || validationErrors.nickName || validationErrors.gender) {
            alert('입력한 정보를 확인해주세요.');
            return;
        }

        try {
            const response = await API.post('/member/sign-up', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data) {
                alert('회원가입이 성공적으로 완료되었습니다.');
                window.location.replace('/');
            } else {
                alert('회원가입에 실패했습니다.');
            }
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <HeaderComponent />
            <section id='joinBox'>
                <h1>회원가입</h1>
                <div className='inputListNBtn'>
                    <div className="inputList">
                        <div className='textInput'>
                            <label>이메일 주소 *</label>
                            <input
                                type="text"
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleEmailBlur}
                            />
                            {validationErrors.email && <span className='error'>{validationErrors.email}</span>}
                        </div>
                        <div className='textInput'>
                            <label>비밀번호 *</label>
                            <input
                                type="password"
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='textInput'>
                            <label>닉네임 *</label>
                            <input
                                type="text"
                                name='nickName'
                                value={formData.nickName}
                                onChange={handleChange}
                                onBlur={handleNickNameBlur}
                            />
                            {validationErrors.nickName && <span className='error'>{validationErrors.nickName}</span>}
                        </div>
                        <div className='textInput'>
                            <label>주소</label>
                            <input
                                type="text"
                                name='city'
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='radioInput'>
                            <label>성별 *</label>
                            <div>
                                <div>
                                    <label>남성</label>
                                    <input
                                        type="radio"
                                        name='gender'
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>여성</label>
                                    <input
                                        type="radio"
                                        name='gender'
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {validationErrors.gender && <span className='error'>{validationErrors.gender}</span>}
                        </div>
                    </div>
                    <div className='btnList'>
                        <div className='submitBtn' onClick={handleSubmit}>가 입</div>
                        <div className='cancelBtn' onClick={handleCancel}>취 소</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JoinPage;
