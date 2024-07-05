import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/styles/App.css';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import AiHairstylePage from './pages/AiHairstylePage';
import MypagePage from './pages/MypagePage';
import MypageEditPage from './pages/MypageEditPage';
import JoinPage from './pages/JoinPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/ai-hairstyle" element={<AiHairstylePage />} />
      <Route path="/mypage" element={<MypagePage />} />
      <Route path="/mypage-edit" element={<MypageEditPage />} />
      <Route path="/join" element={<JoinPage />} />
    </Routes>
  );
}

export default App;
