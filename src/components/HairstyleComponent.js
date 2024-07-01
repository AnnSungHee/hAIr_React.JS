import '../assets/styles/components/HairstyleComponentStyle.css';

const HairstyleComponent = () => {

  return (
    <div className='hairstyleComponent'>
        <div className='imgBox'>
            <img className='hairstyleImg' src="/images/pages/MypagePage/skel.png" alt="헤어스타일 이미지" />
            <img className='bookmarkImg' src="/images/pages/MypagePage/bookmark-filled.svg" alt="북마크" />
        </div>
        <p className='hairName'>단발 C컬 프렌치 밥</p>
    </div>
  );
};

export default HairstyleComponent;
