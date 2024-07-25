import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/pages/HomePageStyle.css';
import HeaderComponent from '../components/HeaderComponent';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 2600); // 1.5초마다 슬라이드 이동

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  return (
    <>
      <HeaderComponent />
      <section id="main">
        <div className="pageNcontents" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <span className="pageNcontent">
            <span className="textNImg">
              <span className="textBox">
                <p className="engScript engScript1">Personalized <span>Style Services</span></p>
                <p className="korScript korScript1">나만을 위한 AI 헤어 상담사와의 대화로 나만의 스타일을 완성하세요</p>
                <div className="tryChatBtn"><Link to="/chatpage">체 험 하 기</Link></div>
              </span>
              <div><img className="bannerImg1" src="/women1.png" alt="여자1" /></div>
            </span>
            <div className="pageIndicator">01/<span>03</span></div>
          </span>
          <span className="pageNcontent">
            <span className="textNImg">
              <span className="textBox">
                <p className="engScript engScript2">AI-based <span>Face Analysis</span></p>
                <p className="korScript korScript2">분석한 내 얼굴형을 토대로 내 맞춤 스타일을 추천받으세요</p>
              </span>
              <div><img className="bannerImg2" src="/man1.png" alt="남자1" /></div>
            </span>
            <div className="pageIndicator">02/<span>03</span></div>
          </span>
          <span className="pageNcontent">
            <span className="textNImg">
              <span className="textBox">
                <p className="engScript engScript3">AI-hairstyle <span>Simulation</span></p>
                <p className="korScript korScript3">대화를 통해 추천받은 헤어스타일을 사용자의 얼굴에 시뮬레이션 해보세요</p>
              </span>
              <div><img className="bannerImg3" src="/women2.png" alt="여자2" /></div>
            </span>
            <div className="pageIndicator pageIndicator3">03/<span>03</span></div>
          </span>
        </div>
      </section>
    </>
  );
};

export default HomePage;




// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../assets/styles/pages/HomePageStyle.css';
// import HeaderComponent from '../components/HeaderComponent';

// const HomePage = () => {

//   return (
//     <>
//       <HeaderComponent />

//       <section id="main">

//         <div className='pageNcontents'>
//           <span className='pageNcontent'>
//             <span className='textNImg'>
//               <span className='textBox'>
//                 <p className='engScript engScript1'>Personalized<span>Style Services</span></p>
//                 <p className='korScript korScript1'>나만을 위한 AI 헤어 상담사와의 대화로 나만의스타일을 완성하세요</p>
//                 <div className='tryChatBtn'><Link to="/chatpage">체 험 하 기</Link></div>
//               </span>
//               <div><img className='bannerImg1' src="/women1.png" alt="여자1" /></div>
//             </span>
//             <div className='pageIndicator'>01/<span>03</span></div>
//           </span>

//           <span className='pageNcontent'>
//             <span className='textNImg'>
//               <span className='textBox'>
//                 <p className='engScript engScript2'>AI-based <span>Face Analysis</span></p>
//                 <p className='korScript korScript2'>분석한 내 얼굴형을 토대로 내 맞춤 스타일을 추천받으세요</p>
//                 {/* <div className='tryChatBtn'><Link to="/chatpage">체 험 하 기</Link></div> */}
//               </span>
//               <div><img className='bannerImg2' src="/man1.png" alt="남자1" /></div>
//             </span>
//             <div className='pageIndicator'>02/<span>03</span></div>
//           </span>

//           <span className='pageNcontent'>
//             <span className='textNImg'>
//               <span className='textBox'>
//                 <p className='engScript engScript3'>AI-hairstyle<span>Simulation</span></p>
//                 <p className='korScript korScript3'>대화를 통해 추천받은 헤어스타일을 사용자의 얼굴에 시뮬레이션 해보세요</p>
//                 {/* <div className='tryChatBtn'><Link to="/chatpage">체 험 하 기</Link></div> */}
//               </span>
//               <div><img className='bannerImg3' src="/women2.png" alt="여자2" /></div>
//             </span>
//             <div className='pageIndicator pageIndicator3'>03/<span>03</span></div>
//           </span>

//         </div>
//         {/* <div className='iconList'>
//           <img src="/twitter.png" alt="트위터" />
//           <img src="/instagram.png" alt="인스타그램" />
//           <img src="/facebook.png" alt="페이스북" />
//           <img src="/v.png" alt="브이" />
//         </div> */}
//       </section>
//     </>
//   );
// };

// export default HomePage;




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
