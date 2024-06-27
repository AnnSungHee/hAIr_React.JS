import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/HomePageStyle.css';
import HeaderComponent from '../components/HeaderComponent';

const HomePage = () => {
  return (
    <>
      <HeaderComponent />

      <div id='mainBanner'>
        <div><img className="bannerImg" src="/main-banner.png" alt="메인 배너 이미지" /></div>
        <span className='links'>
          <div><Link className='chatlink' to="/chat">채팅하기</Link></div>
          <p>아직 계정이 없다면 <a href="">회원가입</a>하러가기</p>
        </span>
      </div>

      <section id="serviceIntro">
        <h1>서비스 소개</h1>
        <section className="faceAnalyze">
          <h1>얼굴형 분석</h1>
          <div><img className="skelImg" src="/skel.png" alt="얼굴형 분석 사진" /></div>
          <span>
            <div>얼굴형 분석</div>
            <p>무엇을 어떻게 활용한 내 얼굴형 분석</p>
            <p>분석한 얼굴형을 토대로 맞춤스타일 추천</p>
          </span>
        </section>
        <section className="styleRecommend">
          <h1>맞춤 헤어스타일 추천</h1>
          <span>
            <div>맞춤 헤어스타일 추천</div>
            <p>무엇을 어떻게 활용한 내 얼굴형 분석</p>
            <p>분석한 얼굴형을 토대로 맞춤스타일 추천</p>
          </span>
          <div><img className="skelImg" src="/skel.png" alt="맞춤 헤어스타일 추천 사진" /></div>
        </section>
      </section>
    </>
  );
};

export default HomePage;




/////////////// 기존 예시코드

// import React from 'react';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Welcome to the React App</h1>
//       <Link to="/form">Go to Form</Link>
//     </div>
//   );
// };

// export default HomePage;
