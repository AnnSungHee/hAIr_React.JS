import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import '../assets/styles/pages/HomePageStyle.css';
import HeaderComponent from '../components/HeaderComponent';

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <>
      <HeaderComponent />
      <section id="main">
        <Slider {...settings}>
          <div className="pageNcontents">
            <div className="textNImg">
              <div className="textBox">
                <p className="engScript engScript1">Personalized<br></br><span>Style Services</span></p>
                <p className="korScript">나만의 AI 헤어 상담사와의 대화로 나만의 스타일을 완성하세요</p>
                <div className="tryChatBtn"><Link to="/chatpage">체 험 하 기</Link></div>
              </div>
              <div><img className="bannerImg" src="/women1.png" alt="여자1" /></div>
            </div>
            <div className="pageIndicator">01/<span>03</span></div>
          </div>
          <div className="pageNcontents">
            <div className="textNImg">
              <div className="textBox">
                <p className="engScript engScript2">AI-based<br></br><span>Face Analysis</span></p>
                <p className="korScript">분석한 내 얼굴형을 토대로 내 맞춤 스타일을 추천받으세요</p>
                <div className="tryChatBtn"></div>
              </div>
              <div><img className="bannerImg" src="/man1-1.png" alt="남자1" /></div>
            </div>
            <div className="pageIndicator">02/<span>03</span></div>
          </div>
          <div className="pageNcontents">
            <div className="textNImg">
              <div className="textBox">
                <p className="engScript">AI-hairstyle<br></br><span>Simulation</span></p>
                <p className="korScript">대화를 통해 추천받은 헤어스타일을 사용자의 얼굴에 시뮬레이션 해보세요</p>
                <div className="tryChatBtn"></div>
              </div>
              <div><img className="bannerImg" src="/women2-1.png" alt="여자2" /></div>
            </div>
            <div className="pageIndicator">03/<span>03</span></div>
          </div>
        </Slider>
      </section>
    </>
  );
};

export default HomePage;
