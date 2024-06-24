// 프로젝트의 진입점 역할
import React from 'react'; // React 라이브러리를 import 합니다.
import ReactDOM from 'react-dom/client'; // ReactDOM 클라이언트를 import 합니다.
import './assets/styles/global.css'; // 전역 스타일 시트를 import 합니다.
import App from './App'; // App 컴포넌트를 import 합니다.
import reportWebVitals from './reportWebVitals'; // 웹 성능 측정 함수를 import 합니다.
import { BrowserRouter as Router } from 'react-router-dom'; // router 설정을 위한 'react-router-dom' import

const root = ReactDOM.createRoot(document.getElementById('root')); // 루트 DOM 요소를 찾아 ReactDOM 루트를 생성합니다.
root.render(
  <React.StrictMode> {/* React.StrictMode로 애플리케이션을 감쌉니다. */}
    <Router>
      <App /> {/* App 컴포넌트를 렌더링합니다. */}
    </Router>
  </React.StrictMode>
);

// 웹 성능을 측정하기 위해 reportWebVitals 함수를 호출합니다.
reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals