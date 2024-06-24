import logo from './assets/images/logo.svg'; // 로고 이미지를 import 합니다.
import './assets/styles/App.css'; // CSS 파일을 import 합니다.

function App() {
  return (
    <div className="App"> {/* App 컴포넌트의 최상위 div입니다. */}
      <header className="App-header"> {/* 헤더 영역을 정의합니다. */}
        <img src={logo} className="App-logo" alt="logo" /> {/* 로고 이미지를 보여줍니다. */}
        <p>
          Edit <code>src/App.js</code> and save to reload. {/* 편집 안내 문구를 표시합니다. */}
        </p>
        <a
          className="App-link"/* 링크 스타일을 정의합니다. */
          href="https://reactjs.org" /* React 공식 사이트로 이동하는 링크입니다. */
          target="_blank"
          rel="noopener noreferrer"
        >
            Learn React {/* 링크 텍스트를 정의합니다. */}
        </a>
      </header>
    </div>
  );
}

export default App; // App 컴포넌트를 export 합니다.
