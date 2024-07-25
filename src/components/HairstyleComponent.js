import '../assets/styles/components/HairstyleComponentStyle.css';

const HairstyleComponent = () => {

  return (
    <div className='hairstyleComponent'>
        <div className='hairstyleComponentImgBox'>
            <img className='hairstyleImg' src="/hair3.png" alt="헤어스타일 이미지" />
        </div>
        <div className='hairstyleComponentIconList'>
          <img className='icon' src="/download.png" alt="다운로드" />
          <img className='icon' src="/delete.png" alt="삭제" />
        </div>
    </div>
  );
};

export default HairstyleComponent;
