### 저장소 경로 설명   
```
src/
├── App.js                 # 메인 앱 컴포넌트
├── App.test.js            # App 컴포넌트에 대한 테스트
├── index.js               # React 앱의 진입점
├── reportWebVitals.js     # 웹 성능 측정
├── setupTests.js          # Jest 테스트 설정
├── assets/                # 이미지와 스타일 같은 자료
│   ├── images/
│   │   └── logo.svg       # 로고 이미지
│   └── styles/
│       ├── App.css        # App 컴포넌트의 CSS
│       └── global.css     # 글로벌 CSS
├── components/            # 재사용 가능한 컴포넌트
├── containers/            # 컨테이너 컴포넌트
├── pages/                 # 페이지 컴포넌트
├── hooks/                 # 커스텀 훅
├── services/              # API 서비스 호출
├── utils/                 # 유틸리티 함수
└── store/                 # 상태 관리 (예: Redux)
```

- 파일명 규칙 : 파일명 + 폴더명(뒤에 붙은 's' 빼기)
- ex > HomePage.js의 css파일을 styles 폴더에 저장할 경우, 
- 파일명인 HomePage와 폴더명에서 's'를 뺀 style을 합쳐, 
- HomPageStyle.css로 이름을 지으면 됩니다.