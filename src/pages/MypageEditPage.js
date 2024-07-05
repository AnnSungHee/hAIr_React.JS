import React, { useState, useRef } from 'react';
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent';
import '../assets/styles/pages/MypageEditPageStyle.css';

const MypageEditPage = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        location: '',
        gender: ''
    });

    const fileInputRef = useRef(null);
    const [profileImg, setProfileImg] = useState("/images/pages/MypagePage/profile.png");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formPayload = new FormData();
        formPayload.append('email', formData.email);
        formPayload.append('password', formData.password);
        formPayload.append('username', formData.username);
        formPayload.append('location', formData.location);
        formPayload.append('gender', formData.gender);

        const file = fileInputRef.current.files[0];
        if (file) {
            formPayload.append('profileImage', file);
        }

        try {
            const response = await axios.post('YOUR_API_ENDPOINT', formPayload);

            if (response.status === 200) {
                console.log('Form submitted successfully');
                // 추가 작업: 성공적으로 제출된 후 필요한 작업을 여기에 추가
            } else {
                console.error('Form submission failed');
                // 추가 작업: 실패 시 처리할 작업을 여기에 추가
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <HeaderComponent/>

            <form onSubmit={handleSubmit} className="profile-form">
                <div className='profileImgBox' onClick={handleDivClick} style={{ cursor: 'pointer' }}>
                    <img className='profileImg' src={profileImg} alt="profile image" />
                    <img className='editImg' src="/images/pages/MypagePage/edit.png" alt="edit image" />
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        onChange={handleFileChange} 
                    />
                </div>
                <div className="form-group">
                    <label>이메일 주소*</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>비밀번호*</label>
                    <input type="text" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>닉네임*</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>주소</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>성별*</label>
                    <div className="gender-options">
                        <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> 남성</label>
                        <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> 여성</label>
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit" className="save-button">저장</button>
                    <button type="button" className="cancel-button">취소</button>
                </div>
            </form>
        </div>
    );
};

export default MypageEditPage;
