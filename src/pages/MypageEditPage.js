
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent';
import '../assets/styles/pages/MypageEditPageStyle.css';
import { useNavigate } from 'react-router-dom';

const MypageEditPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        // password: '',
        username: '',
        location: '',
        gender: ''
    });

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    

    useEffect(() => {

        const userId = localStorage.getItem("id");

        axios.get(`http://localhost:8080/member/${userId}`)
            .then(response => {
                const data = response.data;
                setFormData({
                    email: data.email,
                    // password: data.password,
                    username: data.nickName,
                    location: data.memberProfile.address.city,
                    gender: data.gender
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("id");


        const formPayload = new FormData();
        formPayload.append('email', formData.email);
        // formPayload.append('password', formData.password);
        formPayload.append('nickName', formData.username);
        formPayload.append('city', formData.location);
        formPayload.append('gender', formData.gender);

        try {
            const response = await axios.put(`http://localhost:8080/member/${userId}`, formPayload);

            if (response.status === 200) {
                console.log('Form submitted successfully');
                alert("수정이 완료되었습니다.");
                navigate("/mypage")
            } else {
                console.error('Form submission failed');
                alert("수정에 실패하였습니다.");
                navigate("/mypage")
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleCancel = () => {
        navigate('/mypage');
    };

    return (
        <div>
            <HeaderComponent />

            <form onSubmit={handleSubmit} className="profile-form">
                <h1>개인정보 수정</h1>
                <div className="form-group">
                    <label>이메일 주소 *</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                {/* <div className="form-group">
                    <label>비밀번호*</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div> */}
                <div className="form-group">
                    <label>닉네임 *</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>주소</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>성별 *</label>
                    <div className="gender-options">
                        <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> 남성</label>
                        <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> 여성</label>
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit" className="save-button">저장</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default MypageEditPage;