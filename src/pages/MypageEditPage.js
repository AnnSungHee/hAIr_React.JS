import React, { useState } from 'react';
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
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
      };


    return (
        <div>
            <HeaderComponent/>

            <form onSubmit={handleSubmit} className="profile-form">
                <div className='profileImgBox'>
                    <img className='profileImg' src="/images/pages/MypagePage/profile.png" alt="profile image" />
                    <img className='editImg' src="/images/pages/MypagePage/edit.png" alt="edit image" />
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
                    <label>성별</label>
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
