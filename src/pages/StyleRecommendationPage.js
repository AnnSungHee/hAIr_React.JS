import React, { useState } from 'react';
import ImageBoxComponent from '../components/ImageBoxComponent';
import '../assets/styles/pages/StyleRecommendationPageStyle.css';
import '../assets/styles/components/ImageBoxComponentStyle.css';

const hairStyles = {
  "여성": {
    "롱 헤어": [
      "레이어드컷", "허쉬컷", "원랭스컷", "샤기컷", "뱅헤어", "비대칭컷", "히피펌",
      "레이어드펌", "빌드펌", "젤리펌", "허쉬펌", "볼륨매직", "내츄럴펌", "바디펌",
      "C컬펌", "S컬펌", "루즈펌", "디지털펌", "물결펌", "볼륨펌", "러블리펌", "지젤펌",
      "글램펌", "믹스펌", "볼드펌", "셋팅펌", "발롱펌", "텍스쳐펌", "퍼피베이비펌",
      "에어펌", "특수머리"
    ],
    "미디엄 헤어": [
      "레이어드컷", "허쉬컷", "샤기컷", "리프컷", "보브컷", "원랭스컷", "뱅헤어",
      "히피펌", "레이어드펌", "빌드펌", "허쉬펌", "볼륨매직", "내츄럴펌", "리프펌",
      "바디펌", "C컬펌", "S컬펌", "루즈펌", "디지털펌", "볼륨펌", "물결펌", "러블리펌",
      "지젤펌", "글램펌", "믹스펌", "젤리펌", "볼드펌", "셋팅펌", "쿠션펌", "발롱펌",
      "텍스쳐펌", "퍼피베이비펌", "에어펌", "특수머리"
    ],
    "단발 헤어": [
      "레이어드컷", "허쉬컷", "샤기컷", "리프컷", "원랭스컷", "보브컷", "뱅헤어",
      "비대칭컷", "머쉬룸컷", "히피펌", "레이어드펌", "빌드펌", "젤리펌", "허쉬펌",
      "볼륨매직", "내츄럴펌", "바디펌", "C컬펌", "S컬펌", "리프펌", "루즈펌", "디지털펌",
      "볼륨펌", "물결펌", "러블리펌", "쿠션펌", "텍스쳐펌", "글램펌", "볼드펌", "셋팅펌",
      "발롱펌", "퍼피베이비펌", "에어펌", "특수머리"
    ],
    "숏 헤어": [
      "레이어드컷", "허쉬컷", "샤기컷", "리프컷", "픽시컷", "보브컷", "뱅헤어",
      "머쉬룸컷", "볼륨매직", "내츄럴펌", "C컬펌", "리프펌", "디지털펌", "볼륨펌",
      "아이롱펌", "특수머리"
    ]
  },
  "남성": {
    "미디엄 헤어": [
      "리프컷", "포마드컷", "울프컷", "투블럭컷", "댄디컷", "레이어드컷", "리젠트컷",
      "모히칸컷", "샤기컷", "스왓컷", "슬릭백언더컷", "애즈펌", "리프펌", "포마드펌",
      "가르마펌", "쉐도우펌", "아이롱펌", "쉼표머리", "볼륨펌", "내츄럴펌", "베이비펌",
      "히피펌", "스왈로펌", "댄디펌", "러블리펌", "리젠트펌", "텍스쳐펌", "투블럭펌",
      "특수머리"
    ],
    "숏 헤어": [
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
  const [imageUrl, setImageUrl] = useState('');

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setSelectedLength('');
    setSelectedStyle('');
  };

  const handleLengthChange = (event) => {
    setSelectedLength(event.target.value);
    setSelectedStyle('');
  };

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className='ImageBoxComponentBox'>
        <ImageBoxComponent onImageUpload={handleImageUpload} imageUrl={imageUrl} />
      </div>
      <div>
        <select value={selectedGender} onChange={handleGenderChange}>
          <option value="">성별을 선택하세요</option>
          {Object.keys(hairStyles).map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>

        {selectedGender && (
          <select value={selectedLength} onChange={handleLengthChange}>
            <option value="">길이를 선택하세요</option>
            {Object.keys(hairStyles[selectedGender]).map(length => (
              <option key={length} value={length}>{length}</option>
            ))}
          </select>
        )}

        {selectedLength && (
          <select value={selectedStyle} onChange={handleStyleChange}>
            <option value="">스타일을 선택하세요</option>
            {hairStyles[selectedGender][selectedLength].map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        )}
      </div>

      <div className='resultImgBox'>
        <canvas width={500} height={500} style={{ display: 'none' }}></canvas>
        <div className='loadingStat'>0/<span>100</span></div>
        <div className='loadingTxt' style={{ display: 'none' }}>Loading..</div>
        <div>AI 시뮬레이션</div>
      </div>
    </>
  );
};

export default StyleRecommendationPage;
