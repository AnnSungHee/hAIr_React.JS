import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/styles/App.css';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import AiHairstylePage from './pages/AiHairstylePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/ai-hairstyle" element={<AiHairstylePage />} />
    </Routes>
  );
}

export default App;
