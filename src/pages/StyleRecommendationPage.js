import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageBoxComponent from '../components/ImageBoxComponent';
import '../assets/styles/pages/StyleRecommendationPageStyle.css';
import '../assets/styles/components/ImageBoxComponentStyle.css';
import HeaderComponent from '../components/HeaderComponent';
import API from '../services/api';

const hairStyles = {
  "여성": {
    "롱": [
      "레이어드컷", "허쉬컷", "원랭스컷", "샤기컷", "뱅헤어", "비대칭컷", "히피펌",
      "레이어드펌", "빌드펌", "젤리펌", "허쉬펌", "볼륨매직", "내츄럴펌", "바디펌",
      "C컬펌", "S컬펌", "루즈펌", "디지털펌", "물결펌", "볼륨펌", "러블리펌", "지젤펌",
      "글램펌", "믹스펌", "볼드펌", "셋팅펌", "발롱펌", "텍스쳐펌", "퍼피베이비펌",
      "에어펌", "특수머리"
    ],
    "미디엄": [
      "레이어드컷", "허쉬컷", "샤기컷", "리프컷", "보브컷", "원랭스컷", "뱅헤어",
      "히피펌", "레이어드펌", "빌드펌", "허쉬펌", "볼륨매직", "내츄럴펌", "리프펌",
      "바디펌", "C컬펌", "S컬펌", "루즈펌", "디지털펌", "볼륨펌", "물결펌", "러블리펌",
      "지젤펌", "글램펌", "믹스펌", "젤리펌", "볼드펌", "셋팅펌", "쿠션펌", "발롱펌",
      "텍스쳐펌", "퍼피베이비펌", "에어펌", "특수머리"
    ],
    "단발": [
      "레이어드컷", "허쉬컷", "샤기컷", "리프컷", "원랭스컷", "보브컷", "뱅헤어",
      "비대칭컷", "머쉬룸컷", "히피펌", "레이어드펌", "빌드펌", "젤리펌", "허쉬펌",
      "볼륨매직", "내츄럴펌", "바디펌", "C컬펌", "S컬펌", "리프펌", "루즈펌", "디지털펌",
      "볼륨펌", "물결펌", "러블리펌", "쿠션펌", "텍스쳐펌", "글램펌", "볼드펌", "셋팅펌",
      "발롱펌", "퍼피베이비펌", "에어펌", "특수머리"
    ],
    "숏": [
      "레이어드컷", "허쉬컷", "샤기컷", "리프컷", "픽시컷", "보브컷", "뱅헤어",
      "머쉬룸컷", "볼륨매직", "내츄럴펌", "C컬펌", "리프펌", "디지털펌", "볼륨펌",
      "아이롱펌", "특수머리"
    ]
  },
  "남성": {
    "미디엄": [
      "리프컷", "포마드컷", "울프컷", "투블럭컷", "댄디컷", "레이어드컷", "리젠트컷",
      "모히칸컷", "샤기컷", "스왓컷", "슬릭백언더컷", "애즈펌", "리프펌", "포마드펌",
      "가르마펌", "쉐도우펌", "아이롱펌", "쉼표머리", "볼륨펌", "내츄럴펌", "베이비펌",
      "히피펌", "스왈로펌", "댄디펌", "러블리펌", "리젠트펌", "텍스쳐펌", "투블럭펌",
      "특수머리"
    ],
    "숏": [
      "리프컷", "아이비리그컷", "포마드컷", "울프컷", "크롭컷", "가일컷", "투블럭컷",
      "댄디컷", "레이어드컷", "리젠트컷", "모히칸컷", "버즈컷", "샤기컷", "스왓컷",
      "슬릭백언더컷", "페이드컷", "리프펌", "포마드펌", "가르마펌", "쉐도우펌",
      "아이롱펌", "가일펌", "울프컷", "볼륨펌", "내츄럴펌", "베이비펌", "히피펌",
      "스왈로펌", "댄디펌", "리젠트펌", "텍스쳐펌", "투블럭펌", "특수머리"
    ]
  }
};

const StyleRecommendationPage = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [genderBgColor, setGenderBgColor] = useState('transparent');
  const [lengthBgColor, setLengthBgColor] = useState('transparent');
  const [styleBgColor, setStyleBgColor] = useState('transparent');
  const [genderTextColor, setGenderTextColor] = useState('#A58D78');
  const [lengthTextColor, setLengthTextColor] = useState('#A58D78');
  const [styleTextColor, setStyleTextColor] = useState('#A58D78');
  const [imageUrl, setImageUrl] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [responseImages, setResponseImages] = useState([]);
  const [faceImage, setFaceImage] = useState(null);

  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setSelectedLength('');
    setSelectedStyle('');
    setGenderBgColor(event.target.value ? '#A58D78' : 'transparent');
    setGenderTextColor(event.target.value ? '#ffffff' : '#A58D78');
    setLengthBgColor('transparent');
    setLengthTextColor('#A58D78');
    setStyleBgColor('transparent');
    setStyleTextColor('#A58D78');
  };

  const handleLengthChange = (event) => {
    setSelectedLength(event.target.value);
    setSelectedStyle('');
    setLengthBgColor(event.target.value ? '#A58D78' : 'transparent');
    setLengthTextColor(event.target.value ? '#ffffff' : '#A58D78');
    setStyleBgColor('transparent');
    setStyleTextColor('#A58D78');
  };

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
    setStyleBgColor(event.target.value ? '#A58D78' : 'transparent');
    setStyleTextColor(event.target.value ? '#ffffff' : '#A58D78');
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFaceImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);  // 이미지 URL을 설정
      setFaceImage(file);  // 파일 객체를 설정
    };
    reader.readAsDataURL(file);
  };
  
  const handleSimulationClick = (imageSrc) => {
    if (!imageUrl) {
      console.error("faceImageUrl is missing");
      return;
    }
    console.log("Navigating with:", { imageSrc, faceImageUrl: imageUrl });
    navigate('/ai-hairstyle', { state: { imageSrc, faceImageUrl: imageUrl } });
  };
  

  

  const handleSubmit = async () => {
    if (!selectedGender || !selectedLength || !selectedStyle || !faceImage) {
      alert("모든 옵션을 선택하고 이미지를 업로드해주세요.");
      return;
    }

    const canvas = document.querySelector('.ImageBoxComponentBox canvas');
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('gender', selectedGender);
      formData.append('length', selectedLength);
      formData.append('style', selectedStyle);
      formData.append('face', blob, 'face.png');

      try {
        const response = await API.post('/recommend', formData);
        
        // 위가 axios로 고친 코드

        // 아래는 잘 돌아가던 fetch코드
        // await fetch('https://43.201.187.67:8443/recommend', {
        //   method: 'POST',
        //   body: formData
        // });

        const result = await response.json();
        console.log('Response:', result);
        if (result.length > 0) {
          setResponseImages(result); // 이미지 배열을 상태에 저장
          setModalOpen(true); // 모달 열기
        } else {
          console.error('No images returned from the server.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }, 'image/png');
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <HeaderComponent />
      <div className='fullContainer'>
        <div className='imgSelectBoxContainer'>
          <div className='ImageBoxComponentBox'>
            <ImageBoxComponent onImageUpload={handleFaceImageUpload} imageUrl={imageUrl} />
          </div>
          <div className='selectBoxList'>
            <select 
              value={selectedGender} 
              onChange={handleGenderChange} 
              style={{ backgroundColor: genderBgColor, color: genderTextColor }}
            >
              <option value="">성별을 선택하세요</option>
              {Object.keys(hairStyles).map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>

            {selectedGender && (
              <select 
                value={selectedLength} 
                onChange={handleLengthChange} 
                style={{ backgroundColor: lengthBgColor, color: lengthTextColor }}
              >
                <option value="">길이를 선택하세요</option>
                {Object.keys(hairStyles[selectedGender]).map(length => (
                  <option key={length} value={length}>{length}</option>
                ))}
              </select>
            )}

            {selectedLength && (
              <select 
                value={selectedStyle} 
                onChange={handleStyleChange} 
                style={{ backgroundColor: styleBgColor, color: styleTextColor }}
              >
                <option value="">스타일을 선택하세요</option>
                {hairStyles[selectedGender][selectedLength].map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            )}
          </div>
          <div className='startBtn' onClick={handleSubmit}>start</div>
        </div>

        {modalOpen && (
          <div className='modal'>
            <div className='simulationLinkLabel'>시뮬레이션할 이미지 선택</div>
            <div className='modal-content'>
              <span className='close' onClick={closeModal}>&times;</span>
              {responseImages.length > 0 ? (
                responseImages.map((image, index) => (
                  <div key={index}>
                    <img src={`data:image/png;base64,${image}`} alt={`Recommendation ${index + 1}`} />
                    <div className="simulation-button" onClick={() => handleSimulationClick(`data:image/png;base64,${image}`)}>선택</div>
                  </div>
                ))
              ) : (
                <p>No recommendations available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StyleRecommendationPage;
